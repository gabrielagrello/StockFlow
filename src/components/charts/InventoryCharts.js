import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../../styles/GlobalStyles";
import styled from "styled-components";

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ChartCard = styled(Card)`
  padding: 1.5rem;
`;

const ChartTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
`;

const InventoryCharts = ({ products, movements }) => {
  // Dados para gráfico de estoque por categoria
  const categoryData = products.reduce((acc, product) => {
    const existing = acc.find((item) => item.name === product.category);
    if (existing) {
      existing.quantidade += product.quantity;
    } else {
      acc.push({
        name: product.category,
        quantidade: product.quantity,
      });
    }
    return acc;
  }, []);

  // Dados para gráfico de produtos com estoque baixo
  const lowStockData = products
    .filter(
      (product) => product.quantity > 0 && product.quantity <= product.minStock
    )
    .map((product) => ({
      name: product.name,
      quantidade: product.quantity,
      minimo: product.minStock,
    }));

  // Dados para gráfico de movimentações recentes
  const recentMovements = movements.slice(-10).map((movement) => ({
    data: new Date(movement.date).toLocaleDateString("pt-BR"),
    quantidade:
      movement.type === "entrada" ? movement.quantity : -movement.quantity,
    tipo: movement.type,
  }));

  const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <ChartsGrid>
      <ChartCard>
        <ChartTitle>Estoque por Categoria</ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="quantidade"
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard>
        <ChartTitle>Produtos com Estoque Baixo</ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={lowStockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantidade" fill="#ef4444" name="Estoque Atual" />
            <Bar dataKey="minimo" fill="#f59e0b" name="Estoque Mínimo" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard style={{ gridColumn: "1 / -1" }}>
        <ChartTitle>Movimentações Recentes</ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={recentMovements}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="quantidade"
              stroke="#2563eb"
              name="Quantidade"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </ChartsGrid>
  );
};

export default InventoryCharts;
