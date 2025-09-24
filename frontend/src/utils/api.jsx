import axios from "axios";

const api=axios.create({            //makes a reuseable cient
    baseURL:import.meta.env.VITE_API_URL || "https://track-it-backend-c1k4.onrender.com", 
    withCredentials:true,  //tells browser to send and accept cookies
})

api.interceptors.request.use((config)=>{    //This avoids repeating header setup in every component.
    const token=localStorage.getItem("accessToken");   //It reads accessToken from localStorage 
    if(token){
        config.headers.Authorization=`Bearer ${token}`;  //if present, attaches Authorization: Bearer <token> to the headers.
    }
    return config;
}),(error)=>{
    Promise.reject(error);
}

export default api;