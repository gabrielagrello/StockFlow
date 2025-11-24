# 📦 StockMaster — Sistema de Controle de Estoque

Um sistema moderno de **gestão de estoque**, desenvolvido em **React**, com arquitetura organizada, componentes reutilizáveis e persistência local via API interna.  
Projetado para ser escalável, modular e pronto para evoluir para um SaaS completo.

---

## 🚀 Funcionalidades Principais

### 📊 Dashboard de Estoque  
Visão geral dos produtos cadastrados, quantidades e indicadores básicos.

### 📦 Gestão de Produtos (CRUD Completo)  
Adicione, edite e exclua produtos com interface amigável.

### 🗂️ Persistência Local  
Salvamento e leitura via API interna (simulação), podendo ser facilmente substituída por backend real.

### 🧭 Navegação por Views  
Sidebar moderna com páginas:

- Dashboard  
- Produtos  
- Entradas *(em desenvolvimento)*  
- Saídas *(em desenvolvimento)*  
- Configurações *(em desenvolvimento)*  

### 🧱 Arquitetura Componentizada  
Layout, páginas, hooks, API e dados separados em pastas para facilitar manutenção.

### 🎨 Styled Components + Tema Global  
Estilização consistente, modular e de fácil expansão.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia           | Uso                                       |
|----------------------|--------------------------------------------|
| **React**            | Interface e gerenciamento de estado        |
| **Styled Components** | Estilos no padrão CSS-in-JS              |
| **React Hooks**      | Lógica de estado e ciclo de vida           |
| **API Simulada**     | Mock para armazenamento de produtos        |
| **LocalStorage**     | Persistência dos dados                     |

---

## 🧪 Futuras Implementações

- 🔄 Sistema de Entradas de Estoque  
- 📤 Sistema de Saídas de Estoque  
- 🔐 Login e autenticação JWT  
- 🌐 Backend em Node.js + Prisma  
- 📊 Relatórios e gráficos  
- 🧾 Exportação de dados  
- ☁️ Migração para API real (REST ou GraphQL)

---

## 📝 Padrão de Commits (Conventional Commits)

Este projeto segue o padrão:

- **feat:** nova funcionalidade  
- **fix:** correção de bug  
- **chore:** tarefas internas  
- **docs:** documentação  
- **refactor:** melhoria interna sem alterar comportamento  
- **style:** ajustes de layout/código sem lógica  
- **test:** testes automatizados  
