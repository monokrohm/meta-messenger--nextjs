import { Message } from "@/typings";

const uploadToUpstash = async (message: Message) => {
    const res = await fetch("/api/addMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    const data = await res.json();
    // console.log("Message added >>>", data);
  };

export default uploadToUpstash;
