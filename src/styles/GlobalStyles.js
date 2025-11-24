import styled, { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    secondary: "#64748b",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    background: "#f8fafc",
    surface: "#ffffff",
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
      light: "#94a3b8",
    },
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
  },
};

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background-color: #f8fafc;
    color: #1e293b;
    line-height: 1.5;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.2s ease;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, select {
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      box-shadow: 0 0 0 3px rgb(37 99 235 / 0.1);
    }
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.sm};
  padding: ${(props) => props.padding || "1.5rem"};
  border: 1px solid #e2e8f0;

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`;

export const Button = styled.button`
  background: ${(props) => {
    switch (props.variant) {
      case "secondary":
        return props.theme.colors.secondary;
      case "success":
        return props.theme.colors.success;
      case "warning":
        return props.theme.colors.warning;
      case "error":
        return props.theme.colors.error;
      default:
        return props.theme.colors.primary;
    }
  }};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-weight: 500;
  font-size: 0.875rem;

  &:hover:not(:disabled) {
    background: ${(props) => {
      switch (props.variant) {
        case "secondary":
          return "#475569";
        case "success":
          return "#059669";
        case "warning":
          return "#d97706";
        case "error":
          return "#dc2626";
        default:
          return props.theme.colors.primaryDark;
      }
    }};
    transform: translateY(-1px);
  }
`;
