"use client";

import Image from "next/image";

interface Props {
    message: string;
    imageSrc?: string;
}

export default function EmptyResult({
    message,
    imageSrc = "/no-result.png",
}: Props) {
    return (
        <li className="m-auto w-fit p-8 text-center text-sm text-gray-500">
            <Image
                alt={message}
                src={imageSrc}
                width={200}
                height={200}
                className="mx-auto mb-4"
            />
            {message}
        </li>
    );
}
