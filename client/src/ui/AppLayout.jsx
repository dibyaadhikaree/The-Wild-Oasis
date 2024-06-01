import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-100);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
  scrollbar-color: transparent transparent;
`;

const SytledApp = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Container = styled.div`
  /* max-width: 120rem; */
  margin: 0 0;
`;

function AppLayout() {
  return (
    <Container>
      <SytledApp>
        <Header />
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </SytledApp>
    </Container>
  );
}

export default AppLayout;
