import './login.css'
import Map1 from "./Mapcopy"
import {useEffect} from 'react'
import {Route,useNavigate,Routes } from "react-router-dom"

// component for login page
function Login1() {
    const navigate = useNavigate()
    const handleCallbackResponse = (response) =>
    {
        
        console.log("Encoded JWT ID token: " + response.credential)
        return(
            navigate("/Mapcopy")
        )
    }
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "************************************",
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size:"medium"}
        )
    },[]);
    return (
        <div >
            <div id="signInDiv" className="signIn"></div>
            
        </div>
    )
}

export default Login1;