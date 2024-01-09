import { Message } from "@/typings";
import { serverPusher } from "@/util/pusher";
import redis from "@/util/redis";
import { NextResponse } from "next/server";

type Data = {
    message: Message;
}

export async function POST(request: Request){
    if (request.body == null) return;
    
    const res = await request.json();
    const message = res.message;

    const newMessage: Data = {
        ...message,
        // Replacing with server timestamp
        created_at: Date.now(),
    }

    // Push to Upstash
    await redis.hset('messages', message.id, JSON.stringify(newMessage))
    // Push to Pusher
    serverPusher.trigger('messages', 'new-message', newMessage)

    return NextResponse.json({message: newMessage}, {status: 200})
}