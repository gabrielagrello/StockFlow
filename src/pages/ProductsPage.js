import React, { useState } from "react";
import styled from "styled-components";
import ProductList from "../components/inventory/ProductList";
import ProductForm from "../components/inventory/ProductForm";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`;

const ProductsPage = ({
  products,
  isLoading,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onSaveProduct,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (productData) => {
    onSaveProduct(productData);
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  if (isLoading) {
    return (
      <PageContainer>
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
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ProductsHeader>
        <PageTitle>Gerenciar Produtos</PageTitle>
      </ProductsHeader>

      <ProductList
        products={products}
        onEdit={handleEditProduct}
        onDelete={onDeleteProduct}
        onAddProduct={handleAddProduct}
      />

      <ProductForm
        product={editingProduct}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveProduct}
      />
    </PageContainer>
  );
};

export default ProductsPage;
