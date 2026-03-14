import { Link } from "react-router-dom";

/*
Sidebar del sistema

Aquí van las secciones principales
del SaaS.
*/

export default function Sidebar(){

    return(

        <div className="bg-dark text-white p-3 vh-100">

            <h4 className="mb-4">
                Udu Market
            </h4>

            <ul className="nav flex-column">

                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/pos">
                        Ventas
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/products">
                        Productos
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/categories">
                        Categorías
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/dashboard">
                        Estadísticas
                    </Link>
                </li>

            </ul>

        </div>

    )

}