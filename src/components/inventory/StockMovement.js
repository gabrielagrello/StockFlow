import React, { useState } from "react";
import styled from "styled-components";
import { Plus, Minus, Calendar, Search } from "lucide-react";
import { Card, Button } from "../../styles/GlobalStyles";

const MovementContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MovementForm = styled(Card)`
  margin-bottom: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: 1rem;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 0.875rem;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 0.875rem;
  background: white;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const MovementType = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TypeButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid
    ${(props) => (props.$active ? props.theme.colors.primary : "#e2e8f0")};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: ${(props) => (props.$active ? "#eff6ff" : "white")};
  color: ${(props) =>
    props.$active
      ? props.theme.colors.primary
      : props.theme.colors.text.secondary};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const MovementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MovementItem = styled(Card)`
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const MovementInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const MovementProduct = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
`;

const MovementDetails = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const MovementQuantity = styled.div`
  font-weight: 700;
  color: ${(props) =>
    props.$type === "entrada"
      ? props.theme.colors.success
      : props.theme.colors.error};
`;

const MovementDate = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const EmptyState = styled(Card)`
  text-align: center;
  padding: 3rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const StockMovement = ({ products, onMovement, movements = [] }) => {
  const [movementType, setMovementType] = useState("entrada");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedProduct || !quantity || quantity <= 0) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    // Verificar se é saída e se há estoque suficiente
    if (movementType === "saida" && product.quantity < parseInt(quantity)) {
      alert("Estoque insuficiente para esta saída.");
      return;
    }

    const movement = {
      id: Date.now().toString(),
      productId: selectedProduct,
      productName: product.name,
      type: movementType,
      quantity: parseInt(quantity),
      reason,
      date: new Date().toISOString(),
      previousStock: product.quantity,
    };

    onMovement(movement);

    // Reset form
    setQuantity("");
    setReason("");
  };

  const filteredProducts = products.filter((product) =>
    movementType === "saida" ? product.quantity > 0 : true
  );

  return (
    <MovementContainer>
      <MovementForm>
        <h3 style={{ marginBottom: "1.5rem" }}>
          {movementType === "entrada"
            ? "Entrada no Estoque"
            : "Saída do Estoque"}
        </h3>

        <form onSubmit={handleSubmit}>
          <FormGrid>
            <FormGroup>
              <Label>Tipo de Movimentação</Label>
              <MovementType>
                <TypeButton
                  type="button"
                  $active={movementType === "entrada"}
                  onClick={() => setMovementType("entrada")}
                >
                  <Plus size={16} />
                  Entrada
                </TypeButton>
                <TypeButton
                  type="button"
                  $active={movementType === "saida"}
                  onClick={() => setMovementType("saida")}
                >
                  <Minus size={16} />
                  Saída
                </TypeButton>
              </MovementType>
            </FormGroup>

            <FormGroup>
              <Label>Produto</Label>
              <Select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                required
              >
                <option value="">Selecione...</option>
                {filteredProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Quantidade</Label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Motivo</Label>
              <Input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Compra, venda, ajuste..."
                required
              />
            </FormGroup>

            <Button type="submit">
              {movementType === "entrada"
                ? "Registrar Entrada"
                : "Registrar Saída"}
            </Button>
          </FormGrid>
        </form>
      </MovementForm>

      <div>
        <h3 style={{ marginBottom: "1rem" }}>Histórico de Movimentações</h3>

        {movements.length === 0 ? (
          <EmptyState>
            <Calendar
              size={48}
              style={{ margin: "0 auto 1rem", color: "#cbd5e1" }}
            />
            <p>Nenhuma movimentação registrada ainda.</p>
          </EmptyState>
        ) : (
          <MovementsList>
            {movements
              .slice()
              .reverse()
              .map((movement) => (
                <MovementItem key={movement.id}>
                  <MovementInfo>
                    <MovementProduct>{movement.productName}</MovementProduct>
                    <MovementDetails>
                      <span>Motivo: {movement.reason}</span>
                      <span>Estoque anterior: {movement.previousStock}</span>
                    </MovementDetails>
                  </MovementInfo>

                  <MovementQuantity $type={movement.type}>
                    {movement.type === "entrada" ? "+" : "-"}
                    {movement.quantity}
                  </MovementQuantity>

                  <div>
                    Estoque atual:{" "}
                    {movement.type === "entrada"
                      ? movement.previousStock + movement.quantity
                      : movement.previousStock - movement.quantity}
                  </div>

                  <MovementDate>
                    {new Date(movement.date).toLocaleDateString("pt-BR")}
                  </MovementDate>
                </MovementItem>
              ))}
          </MovementsList>
        )}
      </div>
    </MovementContainer>
  );
};

export default StockMovement;
