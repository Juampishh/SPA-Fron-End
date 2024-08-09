import { useState } from "react";
import {Login} from "../API/Login";


export function useLogin() {
 const [user,setUser] = useState(null);

 const fetchLogin = async (username:string,password:string) => {
    const response = await Login(username,password);
    if(response.code === 200){
        setUser(response.data)
        console.log(response.data);
        
        return response;
    }
    return response;
 }

return{
    user,
    fetchLogin,
    setUser
}
}
