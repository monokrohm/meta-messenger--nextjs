import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignOutButton from "./SignOutButton";
import { getServerSession } from "next-auth";

async function Header() {
  const session = await getServerSession();

  if (session)
    return (
      <header className="flex justify-between items-center p-10 sticky top-0 bg-white shadow-md z-50">
        <div className="flex space-x-2">
          <Image
            src={session.user?.image!}
            alt="Profile Picture"
            width={50}
            height={10}
            className="mx-2 object-contain rounded-full"
          />
          <div>
            <p className="text-[#0A7CFF]">Logged in as:</p>
            <p className="font-bold text-lg">{session.user?.name}</p>
          </div>
        </div>
        <SignOutButton />
      </header>
    );

  return (
    <header className="flex justify-center items-center p-10 sticky top-0 z-50 bg-white">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex items-center space-x-2">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png"
            alt="Logo"
            width={100}
            height={0}
          />

          <p className="text-blue-500">Welcome to Meta Messenger</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
