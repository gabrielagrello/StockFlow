import React from "react";
import styled from "styled-components";
import { TrendingUp, TrendingDown, Package, AlertTriangle } from "lucide-react";
import { Card } from "../styles/GlobalStyles";

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => {
    switch (props.variant) {
      case "success":
        return "#dcfce7";
      case "warning":
        return "#fef3c7";
      case "error":
        return "#fee2e2";
      default:
        return "#dbeafe";
    }
  }};
  color: ${(props) => {
    switch (props.variant) {
      case "success":
        return "#16a34a";
      case "warning":
        return "#d97706";
      case "error":
        return "#dc2626";
      default:
        return "#2563eb";
    }
  }};
`;

const StatInfo = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text.primary};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const RecentActivity = styled(Card)`
  grid-column: 1 / -1;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

const Dashboard = ({ inventoryData }) => {
  // Proteção contra undefined - usar array vazio se products não existir
  const products = inventoryData?.products || [];

  const stats = [
    {
      label: "Total de Produtos",
      value: products.length,
      icon: Package,
      variant: "primary",
    },
    {
      label: "Itens em Estoque",
      value: products.reduce(
        (sum, product) => sum + (product.quantity || 0),
        0
      ),
      icon: TrendingUp,
      variant: "success",
    },
    {
      label: "Produtos em Falta",
      value: products.filter((p) => (p.quantity || 0) === 0).length,
      icon: TrendingDown,
      variant: "error",
    },
    {
      label: "Itens com Baixo Estoque",
      value: products.filter((p) => {
        const quantity = p.quantity || 0;
        const minStock = p.minStock || 0;
        return quantity > 0 && quantity <= minStock;
      }).length,
      icon: AlertTriangle,
      variant: "warning",
    },
  ];

  return (
    <DashboardContainer>
      <h1 style={{ marginBottom: "2rem", fontSize: "2rem", fontWeight: "700" }}>
        Dashboard
      </h1>

      <DashboardGrid>
        {stats.map((stat) => (
          <StatCard key={stat.label}>
            <StatIcon variant={stat.variant}>
              <stat.icon size={24} />
            </StatIcon>
            <StatInfo>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatInfo>
          </StatCard>
        ))}
      </DashboardGrid>

      <RecentActivity>
        <h2 style={{ marginBottom: "1rem" }}>Atividade Recente</h2>
        <ActivityList>
          <ActivityItem>
            <div
              style={{
                background: "#dcfce7",
                padding: "0.5rem",
                borderRadius: "50%",
              }}
            >
              <TrendingUp size={16} color="#16a34a" />
            </div>
            <div>
              <div>Entrada de 50 unidades - Notebook Dell Inspiron</div>
              <small style={{ color: "#64748b" }}>Há 2 horas</small>
            </div>
          </ActivityItem>
          <ActivityItem>
            <div
              style={{
                background: "#fee2e2",
                padding: "0.5rem",
                borderRadius: "50%",
              }}
            >
              <TrendingDown size={16} color="#dc2626" />
            </div>
            <div>
              <div>Saída de 15 unidades - Mouse Logitech MX Master</div>
              <small style={{ color: "#64748b" }}>Há 4 horas</small>
            </div>
          </ActivityItem>
          <ActivityItem>
            <div
              style={{
                background: "#fef3c7",
                padding: "0.5rem",
                borderRadius: "50%",
              }}
            >
              <AlertTriangle size={16} color="#d97706" />
            </div>
            <div>
              <div>Alerta: Teclado Keychron está com estoque zero</div>
              <small style={{ color: "#64748b" }}>Há 1 dia</small>
            </div>
          </ActivityItem>
        </ActivityList>
      </RecentActivity>
    </DashboardContainer>
  );
};

export default Dashboard;
