/*
Header superior del sistema
*/

export default function Header(){

    return(

        <div className="bg-white border-bottom p-3">

            <div className="d-flex justify-content-between">

                <strong>
                    Sistema de ventas
                </strong>

                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={()=>{
                        localStorage.removeItem("token")
                        window.location.href="/"
                    }}
                >
                    Cerrar sesión
                </button>

            </div>

        </div>

    )

}