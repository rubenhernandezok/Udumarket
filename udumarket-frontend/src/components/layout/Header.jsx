import { useTheme } from "./ThemeContext"

/*
Header superior del sistema.

Usa useTheme() para acceder a { theme, toggleTheme }.
El botón de tema alterna entre dark ↔ light y persiste en localStorage.
El botón de cerrar sesión mantiene la misma lógica original.
*/

/* ── Íconos SVG inline (sin dependencia extra) ────────────────────── */

function IconMoon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    )
}

function IconSun() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1"  x2="12" y2="3"  />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"  />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1"  y1="12" x2="3"  y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
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

function IconSettings() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    )
}

/* ── Componente ───────────────────────────────────────────────────── */

export default function Header() {

    const { theme, toggleTheme } = useTheme()

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    }

    return (

        <header className="udu-topbar">

            {/* Marca — alineada con el ancho del sidebar */}
            <div className="udu-topbar__brand">
                <em>UDU</em>MARKET
            </div>

            {/* Título de sección / nombre del negocio */}
            <div className="udu-topbar__title">
                Nombre del Negocio
            </div>

            {/* Acciones */}
            <div className="udu-topbar__actions">

                {/* Toggle dark / light */}
                <button
                    className="udu-icon-btn"
                    onClick={toggleTheme}
                    title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                    aria-label="Alternar tema"
                >
                    {theme === "dark" ? <IconSun /> : <IconMoon />}
                </button>

                {/* Configuración */}
                <button className="udu-icon-btn" title="Configuración" aria-label="Configuración">
                    <IconSettings />
                </button>

                {/* Cerrar sesión */}
                <button
                    className="udu-icon-btn"
                    title="Cerrar sesión"
                    aria-label="Cerrar sesión"
                    onClick={handleLogout}
                    style={{ color: "var(--danger)" }}
                >
                    <IconLogout />
                </button>

            </div>

        </header>

    )

}