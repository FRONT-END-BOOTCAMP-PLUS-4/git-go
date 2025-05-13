import Image from "next/image";
import React from "react";

export default function Header() {
    return (
        <div className="border-border-primary1 flex h-[65px] flex-row items-center justify-between border-b px-24">
            <div className="flex items-center justify-center">
                <Image
                    className="mr-3"
                    src="/logo.svg"
                    alt="logo"
                    width={45}
                    height={45}
                />
                <div className="font-semibold">GITGO</div>
            </div>
            <div className="flex items-center justify-center">
                <Image
                    src="/dummy-profile.svg"
                    alt="user profile"
                    width={30}
                    height={30}
                />
                <div className="ml-4">John Doe</div>
                <Image
                    className="ml-4"
                    src="/down-arrow.svg"
                    alt="down arrow"
                    width={13}
                    height={13}
                />
            </div>
        </div>
    );
}
