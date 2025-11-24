import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Package, Plus, Minus, BarChart3, Settings } from "lucide-react";

const SidebarContainer = styled.aside`
  width: 250px;
  background: white;
  border-right: 1px solid #e2e8f0;
  height: calc(100vh - 80px);
  position: fixed;
  padding: 1.5rem 0;
  transition: transform 0.3s ease;
  transform: ${(props) =>
    props.$isOpen ? "translateX(0)" : "translateX(-100%)"};
  z-index: 90;

  @media (max-width: 768px) {
    transform: ${(props) =>
      props.$isOpen ? "translateX(0)" : "translateX(-100%)"};
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: ${(props) => (props.$active ? "#eff6ff" : "transparent")};
  color: ${(props) =>
    props.$active
      ? props.theme.colors.primary
      : props.theme.colors.text.secondary};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const Sidebar = ({ isOpen = true }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/products", label: "Produtos", icon: Package },
    { path: "/entries", label: "Entradas", icon: Plus },
    { path: "/outputs", label: "Saídas", icon: Minus },
    { path: "/settings", label: "Configurações", icon: Settings },
  ];

  return (
    <SidebarContainer $isOpen={isOpen}>
      <Nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            $active={location.pathname === item.path}
          >
            <item.icon />
            {item.label}
          </NavLink>
        ))}
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;
