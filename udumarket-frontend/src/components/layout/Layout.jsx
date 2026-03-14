import Sidebar from "./Sidebar"
import Header from "./Header"
import { ThemeProvider } from "./ThemeContext"
import "./theme.css"

/*
Layout principal del SaaS.

Contiene:
- ThemeProvider  → contexto global dark/light
- Header         → topbar superior (ocupa ambas columnas)
- Sidebar        → columna izquierda
- {children}     → área de contenido derecha

La estructura de grilla está en .udu-layout (theme.css):
  grid-template-columns: 200px 1fr
  grid-template-rows:    56px  1fr
*/

export default function Layout({ children }) {

    return (

        <ThemeProvider>

            <div className="udu-layout">

                {/* Topbar — ocupa col 1 y 2 completas */}
                <Header />

                {/* Sidebar — col 1, fila 2 */}
                <Sidebar />

                {/* Contenido principal — col 2, fila 2 */}
                <main className="udu-main">
                    {children}
                </main>

            </div>

        </ThemeProvider>

    )

}