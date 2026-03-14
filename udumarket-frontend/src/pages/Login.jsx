import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

/*
Login.jsx

Pantalla de autenticación del sistema.

- centrada verticalmente
- responsive
- preparada para SaaS
*/

export default function Login(){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async(e)=>{

        e.preventDefault()

        const data = await login(email,password)

        if(data.token){

            localStorage.setItem("token",data.token)

            navigate("/pos")

        }else{

            alert("Credenciales incorrectas")

        }

    }

    return(

        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">

            <div className="row w-100 justify-content-center">

                <div className="col-11 col-sm-8 col-md-6 col-lg-4">

                    <div className="card shadow p-4">

                        <h3 className="text-center mb-4">
                            Udu Market
                        </h3>

                        <form onSubmit={handleLogin}>

                            <input
                                type="email"
                                className="form-control mb-3"
                                placeholder="Email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />

                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />

                            <button className="btn btn-primary w-100">

                                Ingresar

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    )

}