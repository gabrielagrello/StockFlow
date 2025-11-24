const STORAGE_KEYS = {
  PRODUCTS: "inventory-products",
  MOVEMENTS: "inventory-movements",
};

export const inventoryAPI = {
  // Buscar todos os produtos
  getProducts: async () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      return [];
    }
  },

  // Salvar produtos
  saveProducts: async (products) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
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

  // Movimentações
  getMovements: async () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MOVEMENTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao carregar movimentações:", error);
      return [];
    }
  },

  addMovement: async (movement) => {
    const movements = await inventoryAPI.getMovements();
    const newMovement = {
      ...movement,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    movements.push(newMovement);
    localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(movements));
    return newMovement;
  },

  // Método para processar movimentação e atualizar produto
  processMovement: async (movement) => {
    const products = await inventoryAPI.getProducts();
    const productIndex = products.findIndex((p) => p.id === movement.productId);

    if (productIndex !== -1) {
      const product = products[productIndex];
      const newQuantity =
        movement.type === "entrada"
          ? product.quantity + movement.quantity
          : product.quantity - movement.quantity;

      products[productIndex] = {
        ...product,
        quantity: newQuantity,
        updatedAt: new Date().toISOString(),
      };

      await inventoryAPI.saveProducts(products);
      const savedMovement = await inventoryAPI.addMovement(movement);

      return { product: products[productIndex], movement: savedMovement };
    }

    throw new Error("Produto não encontrado");
  },
};
