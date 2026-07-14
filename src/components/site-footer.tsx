import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logoAsset from "@/assets/logo-syntalia.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-gradient-navy text-cream/90">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Syntalia Vértice" className="h-12 w-auto object-contain" />
            <div>
              <div className="text-lg font-semibold tracking-wide text-gold">Syntalia</div>
              <div className="text-lg font-semibold tracking-wide text-cream">Vértice</div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/70">
            Marketing digital para empresas con ambición. Estrategia, posicionamiento y captación para empresas que quieren crecer con estructura.
          </p>
          <form className="mt-8 max-w-md">
            <label className="text-xs uppercase tracking-widest text-gold">Newsletter</label>
            <div className="mt-3 flex gap-2">
              <input
                type="email"
                required
                placeholder="Correo electrónico"
                className="flex-1 rounded-full border border-cream/15 bg-cream/5 px-5 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
              />
              <button className="rounded-full bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy hover:bg-cream transition-colors">
                Suscribirme
              </button>
            </div>
          </form>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-gold">Navegación</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/" className="hover:text-gold">Inicio</Link></li>
            <li><Link to="/servicios" className="hover:text-gold">Servicios</Link></li>
            <li><Link to="/quienes-somos" className="hover:text-gold">Quiénes somos</Link></li>
            <li><Link to="/contacto" className="hover:text-gold">Contacto</Link></li>
            <li><Link to="/diagnostico" className="hover:text-gold">Diagnóstico</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-gold">Contacto</h4>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 text-gold" /><span>Avenida de la Libertad 301, 30710 Murcia, España</span></li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold" /><span>+34 647 121 117</span></li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold" /><span>vertice@syntalia.es</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-cream/50 md:flex-row">
          <span>© {new Date().getFullYear()} Syntalia Vértice. Todos los derechos reservados.</span>
          <span>Agencia de crecimiento digital</span>
        </div>
      </div>
    </footer>
  );
}