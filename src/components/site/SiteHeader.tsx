import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import mark from "@/assets/cerebiia-mark.png.asset.json";
import { ThemeToggle } from "@/components/site/ThemeToggle";


const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/cotizar", label: "Cotizador" },
  { to: "/agendar", label: "Agendar" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Cerebiia inicio">
          <img src={mark.url} alt="Cerebiia S.A.S" className="h-8 w-auto" />
          <span className="text-lg font-extrabold tracking-[0.14em] text-foreground">CEREBIIA</span>
        </Link>


        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/cotizar"
            className="btn-solid hidden items-center rounded-full px-5 py-2.5 text-sm font-semibold md:inline-flex"
          >
            Cotizar mi proyecto
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Abrir menú"
            aria-expanded={open}
            className="rounded-full border border-border p-2 md:hidden"
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>

      </div>

      {open ? (
        <div className="border-t border-border/60 px-5 pb-5 md:hidden">
          <nav className="flex flex-col gap-1 pt-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "text-foreground bg-secondary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
