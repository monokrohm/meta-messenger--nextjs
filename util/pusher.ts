import Pusher from "pusher";
import ClientPusher from "pusher-js"

export const serverPusher = new Pusher({
    appId: process.env.PUSHER_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "ap4",
    useTLS: true
})

export const clientPusher = new ClientPusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: 'ap4',
    forceTLS: true
})