import React from "react";
import styled from "styled-components";
import { AlertTriangle, X } from "lucide-react";
import { Card } from "../../styles/GlobalStyles";

const NotificationsContainer = styled.div`
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
`;

const Notification = styled(Card)`
  display: flex;
  align-items: start;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border-left: 4px solid
    ${(props) => {
      switch (props.$type) {
        case "warning":
          return props.theme.colors.warning;
        case "error":
          return props.theme.colors.error;
        default:
          return props.theme.colors.primary;
      }
    }};
  box-shadow: ${(props) => props.theme.shadows.lg};
`;

const NotificationIcon = styled.div`
  color: ${(props) => {
    switch (props.$type) {
      case "warning":
        return props.theme.colors.warning;
      case "error":
        return props.theme.colors.error;
      default:
        return props.theme.colors.primary;
    }
  }};
  flex-shrink: 0;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

const NotificationMessage = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const CloseButton = styled.button`
  background: none;
  padding: 0.25rem;
  border-radius: 50%;
  color: ${(props) => props.theme.colors.text.secondary};
  flex-shrink: 0;

  &:hover {
    background: #f1f5f9;
  }
`;

const Notifications = ({ notifications, onDismiss }) => {
  if (!notifications || notifications.length === 0) return null;

  return (
    <NotificationsContainer>
      {notifications.map((notification) => (
        <Notification key={notification.id} $type={notification.type}>
          <NotificationIcon $type={notification.type}>
            <AlertTriangle size={20} />
          </NotificationIcon>
          <NotificationContent>
            <NotificationTitle>{notification.title}</NotificationTitle>
            <NotificationMessage>{notification.message}</NotificationMessage>
          </NotificationContent>
          <CloseButton onClick={() => onDismiss(notification.id)}>
            <X size={16} />
          </CloseButton>
        </Notification>
      ))}
    </NotificationsContainer>
  );
};

export default Notifications;
