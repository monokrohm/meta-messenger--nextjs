import SignInComponent from "@/components/SignInComponent";
import { Metadata } from "next";
import { getProviders } from "next-auth/react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sign in to Messenger",
};

async function SignInPage() {
  const providers = await getProviders();

  return (
    <div className="grid justify-center items-center h-[90vh] mt-5">
      <div>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
          alt="Logo"
          width={350}
          height={350}
        />
      </div>

      {providers && <SignInComponent providers={providers} />}

      <div className="flex justify-center grayscale opacity-50">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png"
          alt="Logo"
          width={200}
          height={0}
        />
      </div>
    </div>
  );
}

export default SignInPage;
