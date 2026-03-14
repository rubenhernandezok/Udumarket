import { NavLink } from "react-router-dom"

/*
Sidebar del sistema.

Usa <NavLink> de react-router-dom para detectar la ruta activa
y aplicar la clase .active automáticamente.
Los estilos están en theme.css (tokens + .udu-sidebar, .udu-nav, etc.)
*/

/* ── Íconos SVG inline ────────────────────────────────────────────── */

function IconSales() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    )
}

function IconProducts() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    )
}

function IconCategories() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="8"  y1="6"  x2="21" y2="6"  />
            <line x1="8"  y1="12" x2="21" y2="12" />
            <line x1="8"  y1="18" x2="21" y2="18" />
            <line x1="3"  y1="6"  x2="3.01" y2="6"  />
            <line x1="3"  y1="12" x2="3.01" y2="12" />
            <line x1="3"  y1="18" x2="3.01" y2="18" />
        </svg>
    )
}

function IconClients() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}

function IconStats() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4"  />
            <line x1="6"  y1="20" x2="6"  y2="14" />
        </svg>
    )
}

function IconLogout() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    )
}

/* ── Navlink helper ───────────────────────────────────────────────── */

/*
NavLink recibe `className` como función cuando la ruta está activa.
Esto aplica .active automáticamente para que theme.css lo resalte.
*/
const navClass = ({ isActive }) =>
    "udu-nav__item" + (isActive ? " active" : "")

/* ── Componente ───────────────────────────────────────────────────── */

export default function Sidebar() {

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    }

    return (

        <aside className="udu-sidebar">

            {/* Logo del negocio */}
            <div className="udu-sidebar__logo-wrap">
                <div className="udu-sidebar__logo">
                    🏪
                </div>
            </div>

            {/* Navegación */}
            <ul className="udu-nav">

                <li>
                    <NavLink className={navClass} to="/pos">
                        <IconSales />
                        Ventas
                    </NavLink>
                </li>

                <li>
                    <NavLink className={navClass} to="/products">
                        <IconProducts />
                        Productos
                    </NavLink>
                </li>

                <li>
                    <NavLink className={navClass} to="/categories">
                        <IconCategories />
                        Categorías
                    </NavLink>
                </li>

                <li>
                    <NavLink className={navClass} to="/clients">
                        <IconClients />
                        Clientes
                    </NavLink>
                </li>

                <li>
                    <NavLink className={navClass} to="/dashboard">
                        <IconStats />
                        Estadísticas
                    </NavLink>
                </li>

            </ul>

            {/* Cerrar sesión */}
            <div className="udu-sidebar__footer">
                <button className="udu-logout-btn" onClick={handleLogout}>
                    <IconLogout />
                    Cerrar Sesión
                </button>
            </div>

        </aside>

    )

}