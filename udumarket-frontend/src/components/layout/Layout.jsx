import Sidebar from "./Sidebar"
import Header from "./Header"

/*
Layout principal del SaaS.

Contiene:

Sidebar
Header
Contenido
*/

export default function Layout({children}){

    return(

        <div className="container-fluid">

            <div className="row">

                <div className="col-2 p-0">

                    <Sidebar/>

                </div>

                <div className="col-10 p-0">

                    <Header/>

                    <div className="p-4">

                        {children}

                    </div>

                </div>

            </div>

        </div>

    )

}