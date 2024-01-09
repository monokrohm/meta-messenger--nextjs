import { Message } from "@/typings";
import redis from "@/util/redis";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    if (request.method !== "GET") return;
    
    const messagesRes = await redis.hvals('messages');
    const messages: Message[] = 
    messagesRes.map((message)=> JSON.parse(message)).sort((a,b) => a.created_at - b.created_at);

    return NextResponse.json({messages}, {status: 200})
}