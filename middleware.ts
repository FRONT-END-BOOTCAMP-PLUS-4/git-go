// middleware.ts
import { getToken } from "next-auth/jwt";
import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

// 먼저 next-intl 미들웨어를 생성
const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(req: NextRequest) {
    // 1. next-intl 미들웨어 실행 (locale 리다이렉트 처리)
    const intlResponse = intlMiddleware(req);
    if (intlResponse) {
        return intlResponse;
    }

    // 2. 인증 검사
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

    // 3. 통과
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next|.*\\..*).*)", // next-intl + 모든 일반 페이지
        "/member/:path*", // 인증 필요한 페이지
    ],
};
