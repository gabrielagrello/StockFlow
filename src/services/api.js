// Simulação de API local - em produção, substituir por endpoints reais
const STORAGE_KEY = "inventory-data";

export const inventoryAPI = {
  // Buscar todos os produtos
  getProducts: async () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      return [];
    }
  },

  // Salvar produtos
  saveProducts: async (products) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      return products;
    } catch (error) {
      console.error("Erro ao salvar produtos:", error);
      throw error;
    }
  },

  // Adicionar produto
  addProduct: async (product) => {
    const products = await inventoryAPI.getProducts();
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    products.push(newProduct);
    await inventoryAPI.saveProducts(products);
    return newProduct;
  },

  // Atualizar produto
  updateProduct: async (id, updates) => {
    const products = await inventoryAPI.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      await inventoryAPI.saveProducts(products);
      return products[index];
    }
    throw new Error("Produto não encontrado");
  },

  // Deletar produto
  deleteProduct: async (id) => {
    const products = await inventoryAPI.getProducts();
    const filteredProducts = products.filter((p) => p.id !== id);
    await inventoryAPI.saveProducts(filteredProducts);
    return true;
  },
};
