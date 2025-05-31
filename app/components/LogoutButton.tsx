"use client";

import { signOut } from "next-auth/react";
import Button from "./Button";

export default function LogoutButton() {
    return (
        <Button
            type="lined"
            htmlType="button"
            onClick={() => signOut({ callbackUrl: "/" })}
        >
            로그아웃
        </Button>
    );
}
