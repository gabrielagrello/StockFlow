import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "./styles/GlobalStyles";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProductList from "./components/inventory/ProductList";
import ProductForm from "./components/inventory/ProductForm";
import { inventoryAPI } from "./services/api";
import { initialProducts } from "./data/initialData";


const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
`;

const MainLayout = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
`;

const SidebarContainer = styled.div`
  width: 250px;
  flex-shrink: 0;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar produtos
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      let data = await inventoryAPI.getProducts();

      // Se não houver dados, usar dados iniciais
      if (data.length === 0) {
        data = initialProducts;
        await inventoryAPI.saveProducts(data);
      }

      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
        // Atualizar produto existente
        const updatedProduct = await inventoryAPI.updateProduct(
          editingProduct.id,
          productData
        );
        setProducts((prev) =>
          prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
      } else {
        // Adicionar novo produto
        const newProduct = await inventoryAPI.addProduct(productData);
        setProducts((prev) => [...prev, newProduct]);
      }
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <div>Carregando produtos...</div>
        </div>
      );
    }

    switch (activeView) {
      case "dashboard":
        return <Dashboard inventoryData={{ products }} />;
      case "products":
        return (
          <div>
            <h1
              style={{
                marginBottom: "2rem",
                fontSize: "2rem",
                fontWeight: "700",
              }}
            >
              Gerenciar Produtos
            </h1>
            <ProductList
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onAddProduct={handleAddProduct}
            />
          </div>
        );
      case "entries":
        return (
          <div>
            <h1
              style={{
                marginBottom: "2rem",
                fontSize: "2rem",
                fontWeight: "700",
              }}
            >
              Entradas de Estoque
            </h1>
            <div
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "0.75rem",
                textAlign: "center",
              }}
            >
              <p>Funcionalidade em desenvolvimento...</p>
            </div>
          </div>
        );
      case "outputs":
        return (
          <div>
            <h1
              style={{
                marginBottom: "2rem",
                fontSize: "2rem",
                fontWeight: "700",
              }}
            >
              Saídas de Estoque
            </h1>
            <div
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "0.75rem",
                textAlign: "center",
              }}
            >
              <p>Funcionalidade em desenvolvimento...</p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div>
            <h1
              style={{
                marginBottom: "2rem",
                fontSize: "2rem",
                fontWeight: "700",
              }}
            >
              Configurações
            </h1>
            <div
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "0.75rem",
                textAlign: "center",
              }}
            >
              <p>Funcionalidade em desenvolvimento...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard inventoryData={{ products }} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <MainLayout>
          <SidebarContainer>
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
          </SidebarContainer>
          <MainContent>{renderContent()}</MainContent>
        </MainLayout>

        <ProductForm
          product={editingProduct}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveProduct}
        />
      </AppContainer>
    </ThemeProvider>
  );
}


export default App;
