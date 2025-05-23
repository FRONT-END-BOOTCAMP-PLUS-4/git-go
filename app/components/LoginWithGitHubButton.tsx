"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Button from "./Button";
import { MEMBER_URL } from "@/constants/url";

export default function LoginWithGitHubButton() {
    return (
        <div className="flex cursor-pointer justify-center px-0">
            <Button
                type="default"
                size="regular"
                onClick={() =>
                    signIn("github", { callbackUrl: MEMBER_URL.commits })
                }
                label="Login with GitHub"
                icon={
                    <Image
                        src="/github-login.svg"
                        alt="GitHub Logo"
                        width={20}
                        height={20}
                    />
                }
            />
        </div>
    );
}
