import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);

  // ponytail: 307 (default) tells Google the redirect may be temporary, so it
  // can keep indexing "/" instead of the declared canonical locale path.
  if (response.status === 307) {
    const location = response.headers.get("location")!;
    const permanent = NextResponse.redirect(location, 308);
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "location") permanent.headers.append(key, value);
    });
    return permanent;
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|icon|.*\\..*).*)"],
};
