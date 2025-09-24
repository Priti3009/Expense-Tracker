import { createContext , useContext , useState,useEffect } from "react";
import api from "./api.jsx"

//Create context
const AuthContext=createContext();

//Hook for easy usage
export const useAuth=()=>useContext(AuthContext);

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)   //store the usee info
    const [loading,setLoading]=useState(true)

    //runs only once when the provider mounts
    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const res=await api.get("/v1/users/getUser");
                setUser(res.data.data);  
            } catch (error) {
                setUser(null); //not logged in
                
            }finally{
                setLoading(false)
            }
        };
        fetchUser();
    }, [])

    //Login function
    const login = async (email, password) => {
        const res = await api.post("/v1/users/login",  { email, password });
        const { user, accessToken } = res.data.data; 
        localStorage.setItem("accessToken", accessToken);
        setUser(user);
        return res.data;
    }
    // Logout function
    const logout = async () => {
        await api.post("/v1/users/logout");
        setUser(null);
    };

    return(
        <AuthContext.Provider value ={{user,login,logout,loading}}>
            {children}
        </AuthContext.Provider>
    )

}

