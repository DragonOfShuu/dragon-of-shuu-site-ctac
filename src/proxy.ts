import { auth } from "@/app/lib/auth/auth";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import type { NextProxy } from "next/server";

const protectedPathsRegex = /\/dashboard|profile|settings\/.*/; // Example regex for protected paths

export default async function proxy(req: NextRequest, event: NextFetchEvent) {
    // NextAuth's lazy config (NextAuth(() => ...)) makes auth() async at runtime,
    // so auth(cb) returns a Promise<NextMiddleware> rather than NextMiddleware directly.
    // Promise.resolve() makes TypeScript treat the await as intentional, and the cast
    // to NextMiddleware fixes the params mismatch (NextFetchEvent vs AppRouteHandlerFnContext).
    const handler = (await Promise.resolve(
        auth((authedReq) => {
            if (
                !authedReq.auth &&
                protectedPathsRegex.test(authedReq.nextUrl.pathname)
            ) {
                const newUrl = new URL("/login", authedReq.nextUrl.origin);
                return Response.redirect(newUrl);
            }
            if (authedReq.auth && authedReq.nextUrl.pathname === "/login") {
                const newUrl = new URL("/dashboard", authedReq.nextUrl.origin);
                return Response.redirect(newUrl);
            }
            return NextResponse.next();
        }),
    )) as unknown as NextProxy;
    return handler(req, event);
}
