import React, { useState } from "react";
import styled from "styled-components";
import { Card, Button } from "../styles/GlobalStyles";
import { Download, Upload, Trash2, AlertTriangle } from "lucide-react";

const SettingsGrid = styled.div`
  display: grid;
  gap: 2rem;
  max-width: 800px;
`;

const SettingSection = styled(Card)`
  h2 {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

const DangerZone = styled(SettingSection)`
  border: 2px solid #fecaca;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const SettingInfo = styled.div`
  flex: 1;
`;

const SettingTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

const SettingDescription = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const SettingsPage = () => {
  const [exportFormat, setExportFormat] = useState("json");

  const handleExportData = () => {
    const data = {
      products: JSON.parse(localStorage.getItem("inventory-products") || "[]"),
      movements: JSON.parse(
        localStorage.getItem("inventory-movements") || "[]"
      ),
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `estoque-backup-${
      new Date().toISOString().split("T")[0]
    }.${exportFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (data.products) {
          localStorage.setItem(
            "inventory-products",
            JSON.stringify(data.products)
          );
        }
        if (data.movements) {
          localStorage.setItem(
            "inventory-movements",
            JSON.stringify(data.movements)
          );
        }

        alert("Dados importados com sucesso! A página será recarregada.");
        window.location.reload();
      } catch (error) {
        alert("Erro ao importar dados. Verifique o formato do arquivo.");
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (
      window.confirm(
        "⚠️ ATENÇÃO: Esta ação irá apagar TODOS os dados. Isso não pode ser desfeito. Tem certeza?"
      )
    ) {
      localStorage.removeItem("inventory-products");
      localStorage.removeItem("inventory-movements");
      alert("Dados apagados. A página será recarregada.");
      window.location.reload();
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
      <h1 style={{ marginBottom: "2rem", fontSize: "2rem", fontWeight: "700" }}>
        Configurações
      </h1>

      <SettingsGrid>
        <SettingSection>
          <h2>Exportar e Importar Dados</h2>

          <SettingItem>
            <SettingInfo>
              <SettingTitle>Exportar Dados</SettingTitle>
              <SettingDescription>
                Faça backup de todos os produtos e movimentações
              </SettingDescription>
            </SettingInfo>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                style={{
                  padding: "0.5rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                }}
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
              </select>
              <Button onClick={handleExportData}>
                <Download size={16} style={{ marginRight: "0.5rem" }} />
                Exportar
              </Button>
            </div>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingTitle>Importar Dados</SettingTitle>
              <SettingDescription>
                Restaure dados de um backup anterior
              </SettingDescription>
            </SettingInfo>
            <div>
              <input
                type="file"
                accept=".json,.csv"
                onChange={handleImportData}
                style={{ display: "none" }}
                id="import-file"
              />
              <Button as="label" htmlFor="import-file" variant="secondary">
                <Upload size={16} style={{ marginRight: "0.5rem" }} />
                Importar
              </Button>
            </div>
          </SettingItem>
        </SettingSection>

        <DangerZone>
          <h2 style={{ color: "#dc2626" }}>
            <AlertTriangle size={20} style={{ marginRight: "0.5rem" }} />
            Zona de Perigo
          </h2>

          <SettingItem>
            <SettingInfo>
              <SettingTitle style={{ color: "#dc2626" }}>
                Limpar Todos os Dados
              </SettingTitle>
              <SettingDescription>
                Remove permanentemente todos os produtos e movimentações
              </SettingDescription>
            </SettingInfo>
            <Button variant="error" onClick={handleClearData}>
              <Trash2 size={16} style={{ marginRight: "0.5rem" }} />
              Limpar Tudo
            </Button>
          </SettingItem>
        </DangerZone>
      </SettingsGrid>
    </div>
  );
};

export default SettingsPage;
