"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp(){
  const router = useRouter();
  const [name, setName] = useState("");
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSignup = async()=>{
    setLoading(true);

    try{
        const res = await fetch("/api/auth/signup",{
            method:"POST",
            headers:{
                 "Content-Type": "application/json",
            },
            body:JSON.stringify({name, email,password}),          
        });
         const data = await res.json();
         if(res.ok){
          alert(data.message);
          router.push("/login");
         }else{
          alert(data.message || "Sign up failed")
         }
         }catch(error){
          alert("something went wrong")
    }finally {
      setLoading (false)
    }
  };
  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Sign up</h1>

       <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
       <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSignup}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 w-full"
      ></button>

       {loading ? "Creating account..." : "Signup"}
    </div>
  )
}