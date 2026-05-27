import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cada vez que cambie la URL, la pantalla se mueve arriba automáticamente
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}