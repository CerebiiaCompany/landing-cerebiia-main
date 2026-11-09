import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import mark from "/logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-surface/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Cerebiia S.A.S" className="h-10 w-auto" />
            <span className="text-lg font-extrabold tracking-[0.14em] text-foreground">
              CEREBIIA
            </span>
          </div>

          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Cerebiia S.A.S diseña y construye software a la medida para empresas colombianas:
            plataformas internas, integraciones y automatización con inteligencia artificial.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Explorar</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/servicios" className="hover:text-foreground">
                Servicios
              </Link>
            </li>
            <li>
              <Link to="/cotizar" className="hover:text-foreground">
                Cotizador y brief
              </Link>
            </li>
            <li>
              <Link to="/agendar" className="hover:text-foreground">
                Agendar una cita
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-foreground">
                Panel interno
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 text-brand-cyan" aria-hidden />
              <a href="mailto:contacto@cerebiia.com" className="hover:text-foreground">
                contacto@cerebiia.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 text-brand-cyan" aria-hidden />
              <a href="https://wa.me/@Juan3s" className="hover:text-foreground">
                WhatsApp comercial
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 text-brand-cyan" aria-hidden />
              <span>Colombia</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 px-5 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Cerebiia S.A.S · Software a la medida
      </div>
    </footer>
  );
}
