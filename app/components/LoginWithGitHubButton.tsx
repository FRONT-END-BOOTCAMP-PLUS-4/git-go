"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Button from "./Button";

export default function LoginWithGitHubButton() {
    return (
        <div className="flex justify-center">
            <Button
                type="default"
                size="regular"
                onClick={() => signIn("github", { callbackUrl: "/commits" })}
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