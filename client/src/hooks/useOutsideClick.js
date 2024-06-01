import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const modalWindow = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (modalWindow.current && !modalWindow.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return { modalWindow };
}
