import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Notifications from "../common/Notifications";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
`;

const MainLayout = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background: #f8fafc;
`;

const Layout = ({ children, notifications = [], onDismissNotification }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AppContainer>
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <MainLayout>
        <Sidebar isOpen={sidebarOpen} />
        <MainContent style={{ marginLeft: sidebarOpen ? "250px" : "0" }}>
          {children}
        </MainContent>
      </MainLayout>

      <Notifications
        notifications={notifications}
        onDismiss={onDismissNotification}
      />
    </AppContainer>
  );
};

export default Layout;
