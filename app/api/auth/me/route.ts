import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/current-user";

export async function GET(){
    try{
const user = await getCurrentUser();

if(!user){
    return NextResponse.json({user:null}, {status:401});
}
return NextResponse.json(     
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );

    }catch(error){
console.error("ME_ERROR", error);
 return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
    }
}