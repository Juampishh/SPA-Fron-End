
import { useNavigate } from "react-router-dom";
import {Login} from "../API/Login";
import { toast } from "react-hot-toast";


export function useLogin() {
const navigate = useNavigate();
const fetchLogin = async (username:string,password:string,setUser:any) => {
    const response = await Login(username,password);
    if(response.code === 200){
        setUser(response.data)
        navigate('/home');
        toast.success('Bienvenido a Sentirse Bien');
        localStorage.setItem('usuario',JSON.stringify(response.data));
        return response;
    }else{
        toast.error(response.message);
    }  
 }

 
return {fetchLogin};

}
