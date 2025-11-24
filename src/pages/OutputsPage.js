import React from "react";
import styled from "styled-components";
import StockMovement from "../components/inventory/StockMovement";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 2rem;
`;

const OutputsPage = ({ products, movements, onMovement }) => {
  const outputMovements = movements.filter((m) => m.type === "saida");

  return (
    <PageContainer>
      <PageTitle>Saídas de Estoque</PageTitle>
      <StockMovement
        products={products}
        onMovement={(movement) => onMovement({ ...movement, type: "saida" })}
        movements={outputMovements}
      />
    </PageContainer>
  );
};

export default OutputsPage;
