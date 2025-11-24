import React, { useState } from "react";
import styled from "styled-components";
import { Edit2, Trash2, Search } from "lucide-react";
import { Card, Button } from "../../styles/GlobalStyles";

const Toolbar = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid #d1d5db;
    border-radius: ${(props) => props.theme.borderRadius.md};
    font-size: 0.875rem;

    &:focus {
      border-color: ${(props) => props.theme.colors.primary};
    }
  }

  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ProductCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`;

const ProductCategory = styled.span`
  background: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.875rem;
`;

const QuantityBadge = styled.span`
  background: ${(props) => {
    if (props.quantity === 0) return "#fecaca";
    if (props.quantity <= props.minStock) return "#fef3c7";
    return "#dcfce7";
  }};
  color: ${(props) => {
    if (props.quantity === 0) return "#dc2626";
    if (props.quantity <= props.minStock) return "#d97706";
    return "#16a34a";
  }};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 0.875rem;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

const IconButton = styled.button`
  padding: 0.5rem;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  background: transparent;

  &:hover {
    background: #f1f5f9;
    color: ${(props) => props.theme.colors.text.primary};
  }

  &.delete:hover {
    background: #fee2e2;
    color: #dc2626;
  }
`;

const ProductList = ({ products, onEdit, onDelete, onAddProduct }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Toolbar>
        <SearchBox>
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>

        <Button onClick={onAddProduct}>Adicionar Produto</Button>
      </Toolbar>

      <ProductGrid>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id}>
            <ProductHeader>
              <div>
                <ProductName>{product.name}</ProductName>
                <ProductCategory>{product.category}</ProductCategory>
              </div>
              <QuantityBadge
                quantity={product.quantity}
                minStock={product.minStock}
              >
                {product.quantity} un
              </QuantityBadge>
            </ProductHeader>

            <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
              {product.description}
            </p>

            <ProductInfo>
              <span>Código: {product.code}</span>
              <span>Mín: {product.minStock} un</span>
            </ProductInfo>

            <ProductActions>
              <IconButton onClick={() => onEdit(product)}>
                <Edit2 size={16} />
              </IconButton>
              <IconButton
                className="delete"
                onClick={() => onDelete(product.id)}
              >
                <Trash2 size={16} />
              </IconButton>
            </ProductActions>
          </ProductCard>
        ))}
      </ProductGrid>
    </div>
  );
};

export default ProductList;
