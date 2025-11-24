import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import EntriesPage from "./pages/EntriesPage";
import OutputsPage from "./pages/OutputsPage";
import SettingsPage from "./pages/SettingsPage";

const AppRouter = ({
  products,
  movements,
  isLoading,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onSaveProduct,
  onStockMovement,
}) => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard inventoryData={{ products }} movements={movements} />
            }
          />
          <Route
            path="/products"
            element={
              <ProductsPage
                products={products}
                isLoading={isLoading}
                onAddProduct={onAddProduct}
                onEditProduct={onEditProduct}
                onDeleteProduct={onDeleteProduct}
                onSaveProduct={onSaveProduct}
              />
            }
          />
          <Route
            path="/entries"
            element={
              <EntriesPage
                products={products}
                movements={movements}
                onMovement={onStockMovement}
              />
            }
          />
          <Route
            path="/outputs"
            element={
              <OutputsPage
                products={products}
                movements={movements}
                onMovement={onStockMovement}
              />
            }
          />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Rota fallback para 404 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;
