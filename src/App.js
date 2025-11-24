import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "./styles/GlobalStyles";
import AppRouter from "./AppRouter";
import ProductForm from "./components/inventory/ProductForm";
import { inventoryAPI } from "./services/api";
import { initialProducts } from "./data/initialData";

function App() {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados iniciais
  useEffect(() => {
    loadInitialData();
  }, []);

  // Verificar estoque baixo
  useEffect(() => {
    if (products.length > 0) {
      checkLowStock();
    }
  }, [products]);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      const [productsData, movementsData] = await Promise.all([
        inventoryAPI.getProducts(),
        inventoryAPI.getMovements(),
      ]);

      // Se não houver produtos, usar dados iniciais
      if (productsData.length === 0) {
        await inventoryAPI.saveProducts(initialProducts);
        setProducts(initialProducts);
      } else {
        setProducts(productsData);
      }

      setMovements(movementsData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkLowStock = () => {
    const lowStockProducts = products.filter(
      (product) => product.quantity > 0 && product.quantity <= product.minStock
    );

    const newNotifications = lowStockProducts.map((product) => ({
      id: `low-stock-${product.id}-${Date.now()}`,
      type: "warning",
      title: "Estoque Baixo",
      message: `${product.name} está com estoque baixo (${product.quantity} unidades)`,
    }));

    setNotifications(newNotifications);
  };

  const handleDismissNotification = (notificationId) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  // Handlers para produtos
  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        const updatedProduct = await inventoryAPI.updateProduct(
          editingProduct.id,
          productData
        );
        setProducts((prev) =>
          prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
      } else {
        const newProduct = await inventoryAPI.addProduct(productData);
        setProducts((prev) => [...prev, newProduct]);
      }
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto. Tente novamente.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await inventoryAPI.deleteProduct(productId);
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir produto. Tente novamente.");
      }
    }
  };

  // Handler para movimentações
  const handleStockMovement = async (movementData) => {
    try {
      const result = await inventoryAPI.processMovement(movementData);
      setProducts((prev) =>
        prev.map((p) => (p.id === result.product.id ? result.product : p))
      );
      setMovements((prev) => [...prev, result.movement]);
    } catch (error) {
      console.error("Erro ao processar movimentação:", error);
      alert("Erro ao processar movimentação. Tente novamente.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <AppRouter
        products={products}
        movements={movements}
        isLoading={isLoading}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onSaveProduct={handleSaveProduct}
        onStockMovement={handleStockMovement}
        notifications={notifications}
        onDismissNotification={handleDismissNotification}
      />

      {/* Modal de produto (mantido fora do router para overlay global) */}
      <ProductForm
        product={editingProduct}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
      />
    </ThemeProvider>
  );
}

export default App;
