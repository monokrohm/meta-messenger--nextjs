import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";
import { Providers } from "@/components/Providers";
import { Message } from "@/typings";
import { getServerSession } from "next-auth";

export default async function Home() {
  // Get messages on server side
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`
  ).then((res) => res.json());

  //console.log(data);

  const messages: Message[] = data.messages;
  const session = await getServerSession();

  return (
    <Providers>
      <main className="flex text-4xl ">
        <MessageList initialMessages={messages} />
        <ChatInput session={session} />
      </main>
    </Providers>
  );
}
