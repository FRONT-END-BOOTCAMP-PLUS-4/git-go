import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;
    const { pathname } = req.nextUrl;
    const protectedPaths = ["/member"];
    const isProtected = protectedPaths.some((path) =>
        pathname.startsWith(path)
    );

    if (isProtected && !isAuthenticated) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/member/:path*"],
};