import { useState } from "react"
import { login } from "../services/authService"
import { useNavigate } from "react-router-dom"
import "./Login.css"

/*
Login.jsx

Pantalla de autenticación del sistema.
- Estilos en Login.css (tokens de theme.css → dark/light automático)
- Lógica de backend intacta (authService)
- Sin fuentes externas, sin estilos inline
*/

/* ── Ícono de carrito (SVG inline, sin dependencias) ────────────── */
function CartIcon() {
    return (
        <svg width="40" height="40" viewBox="0 0 52 52" fill="none">
            <path
                d="M8 10h4l6 22h20l4-16H16"
                stroke="white"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="22" cy="37" r="3.5" fill="white" />
            <circle cx="36" cy="37" r="3.5" fill="white" />
            <rect x="20" y="18" width="5"  height="7" rx="1" fill="white" opacity="0.6" />
            <rect x="27" y="16" width="5"  height="9" rx="1" fill="white" opacity="0.6" />
            <rect x="34" y="20" width="4"  height="5" rx="1" fill="white" opacity="0.6" />
        </svg>
    )
}

/* ── Ícono ojo (mostrar/ocultar contraseña) ─────────────────────── */
function EyeIcon({ open }) {
    return (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
            {!open && <line x1="3" y1="3" x2="21" y2="21" strokeWidth="2.2" />}
        </svg>
    )
}

/* ── Componente principal ────────────────────────────────────────── */
export default function Login() {

    const [email, setEmail]               = useState("")
    const [password, setPassword]         = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading]           = useState(false)

    const navigate = useNavigate()

    // ── Lógica de backend sin modificar ──────────────────────────
    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = await login(email, password)
        setLoading(false)
        if (data.token) {
            localStorage.setItem("token", data.token)
            navigate("/pos")
        } else {
            alert("Credenciales incorrectas")
        }
    }
    // ─────────────────────────────────────────────────────────────

    return (

        <div className="login-page">

            {/* Marca */}
            <header className="login-header">
                <h1 className="login-brand">
                    <span className="login-brand__udu">UDU</span>
                    <span className="login-brand__market">MARKET</span>
                </h1>
                <p className="login-brand__sub">Tu local. Tu mercado. Tu control.</p>
            </header>

            {/* Card */}
            <div className="login-card">

                {/* Panel izquierdo — acento */}
                <div className="login-panel-left">
                    <div className="login-icon-wrap">
                        <CartIcon />
                    </div>

                    {/* Solo visible en mobile */}
                    <div className="login-mobile-text">
                        <span className="login-mobile-brand">UDUMARKET</span>
                        <span className="login-mobile-sub">Tu local. Tu mercado.</span>
                    </div>
                </div>

                {/* Panel derecho — formulario */}
                <div className="login-panel-right">

                    <div className="login-panel-title">
                        Iniciar sesión
                        <span>Ingresá tus credenciales para continuar</span>
                    </div>

                    <form onSubmit={handleLogin}>

                        {/* Email */}
                        <div className="login-field">
                            <label className="login-label" htmlFor="login-email">
                                Correo electrónico
                            </label>
                            <input
                                id="login-email"
                                type="email"
                                className="login-input"
                                placeholder="tulocal@udumarket.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>

                        {/* Contraseña */}
                        <div className="login-field">
                            <label className="login-label" htmlFor="login-password">
                                Contraseña
                            </label>
                            <div className="login-input-wrap">
                                <input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    className="login-input"
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="login-eye-btn"
                                    onClick={() => setShowPassword(v => !v)}
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    <EyeIcon open={showPassword} />
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >
                            {loading ? "Ingresando..." : "Ingresar"}
                        </button>

                        <p className="login-support">
                            ¿No podés acceder?{" "}
                            <a href="#">Contactar soporte</a>
                        </p>

                    </form>

                </div>

            </div>

            {/* Footer */}
            <footer className="login-footer">
                {new Date().getFullYear()} · UDUSoft · Todos los derechos reservados
            </footer>

        </div>

    )

}
