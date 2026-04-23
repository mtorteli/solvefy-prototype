import { Link } from "react-router-dom";
import logoLight from "@/assets/logo-solvefy.png";
import logoDark from "@/assets/logo-solvefy-dark.png";

export const Logo = ({ variant = "light" }: { variant?: "light" | "dark" }) => {
  // "light" = light background (header) → use dark logo
  // "dark"  = dark background (footer) → use white/light logo
  const src = variant === "light" ? logoDark : logoLight;
  return (
    <Link to="/" className="flex items-center group" aria-label="Solvefy">
      <img
        src={src}
        alt="Solvefy"
        className="w-full max-w-[150px] h-auto transition-transform group-hover:scale-105"
      />
    </Link>
  );
};
