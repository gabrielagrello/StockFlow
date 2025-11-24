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

const EntriesPage = ({ products, movements, onMovement }) => {
  const entryMovements = movements.filter((m) => m.type === "entrada");

  return (
    <PageContainer>
      <PageTitle>Entradas de Estoque</PageTitle>
      <StockMovement
        products={products}
        onMovement={(movement) => onMovement({ ...movement, type: "entrada" })}
        movements={entryMovements}
      />
    </PageContainer>
  );
};

export default EntriesPage;
