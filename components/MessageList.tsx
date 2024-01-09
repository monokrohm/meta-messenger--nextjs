"use client";

import { Message } from "@/typings";
import fetcher from "@/util/fetchMessages";
import React, { useEffect } from "react";
import useSWR from "swr";
import MessageComponent from "./MessageComponent";
import { clientPusher } from "@/util/pusher";

type Props = {
  initialMessages: Message[];
};

function MessageList({ initialMessages }: Props) {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight });

    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", async (data: Message) => {
      // No need to update cache if sender is yourself
      if (messages?.find((message) => message?.id === data.id)) return;
      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });

    return () => {
      channel.unbind_all();
      // channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);

  return (
    <div className="mx-auto px-5 pt-8 pb-32 space-y-5 min-w-[40vw] max-w-2xl xl:max-w-4xl">
      {/* Load server side rendered messages then update with client messages, faster feedback */}
      {(messages || initialMessages).map((message) => (
        <MessageComponent key={message?.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;
