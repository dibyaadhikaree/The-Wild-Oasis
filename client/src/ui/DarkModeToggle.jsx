import { createContext, useState } from "react";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../context/DarkModeContext";

const ModeContext = createContext();

function DarkModeToggle() {
  const { mode, handleToggle } = useDarkMode();

  return (
    <ButtonIcon onClick={handleToggle}>
      {mode === "dark-mode" ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
