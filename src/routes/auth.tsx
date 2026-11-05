import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, LockKeyhole } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acceso interno — Cerebiia S.A.S" },
      {
        name: "description",
        content: "Ingreso al panel interno de Cerebiia S.A.S para el equipo comercial y de desarrollo.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Acceso interno — Cerebiia S.A.S" },
      { property: "og:description", content: "Ingreso al panel interno de Cerebiia S.A.S." },
      { property: "og:url", content: "/auth" },
    ],
    links: [{ rel: "canonical", href: "/auth" }],
  }),
  component: AuthPage,
});

const inputClass =
  "w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm focus:border-brand-cyan focus:outline-none";

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error("No pudimos iniciar sesión. Verifique sus credenciales.");
      return;
    }
    toast.success("Bienvenido");
    navigate({ to: "/admin" });
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto flex max-w-md flex-col px-5 py-20">
        <div className="bento p-8">
          <LockKeyhole className="size-8 text-brand-cyan" aria-hidden />
          <h1 className="mt-4 text-2xl font-bold">Acceso interno</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Panel para el equipo de Cerebiia. Si necesita una cuenta, solicítela a la dirección de
            desarrollo.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <label className="block">
              <span className="text-sm font-medium">Correo</span>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={`mt-2 ${inputClass}`}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Contraseña</span>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={`mt-2 ${inputClass}`}
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="btn-solid inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
              Ingresar
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
