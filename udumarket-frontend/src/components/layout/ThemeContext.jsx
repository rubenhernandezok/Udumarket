import { createContext, useContext, useState, useEffect } from "react"

/*
ThemeContext — contexto global de tema oscuro/claro.

Uso:
  const { theme, toggleTheme } = useTheme()

Persiste la preferencia en localStorage bajo la clave "udu-theme".
El valor de `theme` es "dark" | "light".
*/

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("udu-theme") || "dark"
    })

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
        localStorage.setItem("udu-theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark")
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}

export function useTheme() {
    return useContext(ThemeContext)
}
