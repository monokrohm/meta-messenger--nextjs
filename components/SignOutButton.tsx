"use client";

import { signOut } from "next-auth/react";

function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="py-2 px-4 bg-[#0A7CFF] hover:bg-[#0976F2] text-white font-bold rounded"
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;
