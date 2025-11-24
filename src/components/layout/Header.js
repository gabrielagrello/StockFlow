import React from "react";
import styled from "styled-components";
import { Package, Bell, User, Menu } from "lucide-react";

const HeaderContainer = styled.header`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  padding: 0.5rem;
  border-radius: 50%;
  color: ${(props) => props.theme.colors.text.secondary};

  &:hover {
    background: #f1f5f9;
    color: ${(props) => props.theme.colors.text.primary}:;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  padding: 0.5rem;
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.colors.text.secondary};

  &:hover {
    background: #f1f5f9;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = ({ onMenuToggle }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <MenuButton onClick={onMenuToggle}>
            <Menu size={20} />
          </MenuButton>
          <Package />
          <span>StockControl</span>
        </Logo>

        <HeaderActions>
          <IconButton>
            <Bell size={20} />
          </IconButton>

          <IconButton>
            <User size={20} />
          </IconButton>
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
