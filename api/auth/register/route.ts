import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";
import { create } from "domain";
import { model } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try{
            const {email , password } = await request.json()
            if (!email || !password){
                return NextResponse.json(
                    {
                        error:"Email and password are required "
                    },
                    {status:403}
                )
            }

             await connectToDatabase()
             const existingUser = await User.findOne({email})
            if(existingUser){
                    return NextResponse.json(
                         {
                        error:"User Already Registerd"
                    },
                    {status:400} 
                );  
                        }
                        await User.create({
                            email,
                            password
                        })
                        return NextResponse.json(
                            {message:"You are successfully Signup  !!!Please login !!"}
                        );
            

    }
    catch(error){
        console.error("Registration error")
            return NextResponse.json(
                {error : "Failed to register User"},
                {status:400}
            )
    }
    
}