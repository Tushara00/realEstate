"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage(){
const router = useRouter();

const [email, setEmail] = useState("");
const [password,setPassword] =useState("")
const [loading, setLoading] = useState(false);

const handleLogin = async()=>{
  setLoading(true);
  try{
const res = await fetch("/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
});
  const data = await res.json();  

    if(res.ok){
        router.push("/dashboard");
    }else{
       alert(data.message || "Login failed");
    }
}catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
};
return(
         <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
       <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 w-full"
      >
         {loading ? "Logging in..." : "Login"}
      </button>
    </div>
)
}