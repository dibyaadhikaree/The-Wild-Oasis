/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useAuth";
import Spinner from "./Spinner";
import styled from "styled-components";
import { createContext, useContext, useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthContext = createContext();

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user

  const { currentUser, isLoading } = useUser();

  //2 If there is no authenticated user , navigate to login page

  useEffect(
    function () {
      if (!currentUser && !isLoading) navigate("/login");
    },
    [currentUser, isLoading, navigate]
  );

  //3. While that happens , show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //4. If there is user render the app

  if (currentUser)
    return (
      <AuthContext.Provider value={currentUser}>
        {children}
      </AuthContext.Provider>
    );
}

export const useCurrentUser = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Context used outside the provider");

  return context.user;
};

export default ProtectedRoute;
