import React from "react";
import styled from "styled-components";
import { Package, Plus, Minus, BarChart3, Settings } from "lucide-react";

const SidebarContainer = styled.aside`
width: 250px;
background: white
border-right: 1px solid #e2e8f0;
height: calc(100vh - 80px);
position: fixed;
padding: 1.5rem 0;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: ${(props) => (props.active ? "#eff6ff" : "transparent")};
  color: ${(props) =>
    props.active
      ? props.theme.colors.primary
      : props.theme.colors.text.secondary};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-weight: ${(props) => (props.active ? "600" : "500")};
  width: 100%;
  text-align: left;

  &:hover {
    background: #f8fafc;
    color: ${(props) => props.theme.colors.primary};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "products", label: "Produtos", icon: Package },
    { id: "entries", label: "Entradas", icon: Plus },
    { id: "outputs", label: "Saídas", icon: Minus },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  return (
    <SidebarContainer>
      <Nav>
        {menuItems.map((item) => (
          <NavItem
            key={item.id}
            active={activeView === item.id}
            onClick={() => setActiveView(item.id)}
          >
            <item.icon />
            {item.label}
          </NavItem>
        ))}
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;
