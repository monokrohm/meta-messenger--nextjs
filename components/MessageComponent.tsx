import { Message } from "@/typings";
import { useSession } from "next-auth/react";
import Image from "next/image";
import TimeAgo from "react-timeago";

type Props = {
  message: Message;
};

function MessageComponent({ message }: Props) {
  const { data: session } = useSession();
  const isUser = session?.user?.email === message?.email;

  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          className="rounded-full mx-2"
          width={50}
          height={10}
          src={message?.profilePic}
          alt="Profile Picture"
        />
      </div>

      <div>
        <p
          className={`px-[2px] pb-[2px] text-[0.85rem] leading-5 text-gray-400 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {message?.username}
        </p>

        <div className="flex items-end">
          <div
            className={`px-3 py-1 w-fit rounded-xl ${
              isUser ? "ml-auto bg-[#0A7CFF] text-white order-2" : "bg-gray-200"
            }`}
          >
            <p className="text-[0.85rem] leading-7">{message?.message}</p>
          </div>

          <p
            className={`px-2 text-[0.75rem] italic text-gray-400 ${
              isUser && "text-right"
            }`}
          >
            <TimeAgo date={new Date(message?.created_at)} />
            {/* {new Date(message?.created_at).toLocaleString()} */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageComponent;
