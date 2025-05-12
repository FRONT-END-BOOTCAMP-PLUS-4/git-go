"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginWithGitHubButton() {
    return (
        <button
            onClick={() => signIn("github", { callbackUrl: "/commit" })}
            className="bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold py-2 px-4 rounded-md shadow-md transition"
        >
            <Image
                src="/github-login.svg"
                alt="GitHub Logo"
                width={20}
                height={20}
                className="inline mr-2"
            />
            Login with GitHub
        </button>
    );
}