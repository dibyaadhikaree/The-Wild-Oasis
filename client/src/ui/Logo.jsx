import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled(NavLink)`
  text-align: center;
  cursor: pointer;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { mode } = useDarkMode();

  const src = mode === "dark-mode" ? "/logo-dark.png" : "/logo-light.png";

  return (
    <StyledLogo to="/dashboard">
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
