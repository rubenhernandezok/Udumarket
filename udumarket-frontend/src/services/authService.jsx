export const login = async(email,password)=>{

    const res = await fetch(
        "http://localhost:3000/api/auth/login",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }
    )

    return await res.json()

}