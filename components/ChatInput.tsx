"use client";

import { Message } from "@/typings";
import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import uploadToUpstash from "@/util/uploadToUpstash";
import useSWR, { useSWRConfig } from "swr";
import fetcher from "@/util/fetchMessages";
import { getServerSession } from "next-auth";

type Props = {
  session: Awaited<ReturnType<typeof getServerSession>>;
};

function ChatInput({ session }: Props) {
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input || !session) return;

    const messageToSend = input;

    setInput("");

    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    };

    const uploadToUpstashFunction = async () => {
      const data = await uploadToUpstash(message);

      return [data, ...messages!];
    };

    await mutate(uploadToUpstashFunction, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={addMessage}
      className="flex fixed bottom-0 w-full px-10 py-5 space-x-2 border-t border-gray-200 bg-white z-50"
    >
      <input
        type="text"
        placeholder="Aa"
        disabled={!session}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-5 py-1 rounded-full text-[1.25rem] bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 
        focus:ring-blue-600 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!input}
        className="py-1 px-4 rounded text-[1.5rem] bg-[#0A7CFF] hover:bg-[#0976F2] font-bold text-white 
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
