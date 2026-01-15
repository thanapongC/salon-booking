

// import { NextResponse } from "next/server";
// import createMiddleware from "next-intl/middleware";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";
// import withAuth from "next-auth/middleware";

// export const locales = ["en", "th"] as const;

// const intlMiddleware = createMiddleware({
//   locales: locales,
//   defaultLocale: "th",
//   localeDetection: false,
// });

// const authMiddleware = withAuth(
//   async function onSuccess(req) {
//     return intlMiddleware(req);
//   },
//   {
//     callbacks: {
//       authorized: async ({ token }) => {
//         if (!token) return false;
//         const currentTime = Math.floor(Date.now() / 1000);
//         return typeof token.exp === "number" && token.exp > currentTime;
//       },
//     },
//     pages: {
//       signIn: "/auth/sign-in",
//     },
//   }
// );

// export default async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // --------------------------------------------------------
//   // ⭐ 1) อนุญาตหน้า booking ของ customer โดยไม่ต้องล็อคอิน
//   // /protected/shop/[shop_id]/booking
//   // --------------------------------------------------------
//   const bookingPublic = new RegExp(
//     `^/(${locales.join("|")})/protected/shop/([^/]+)/booking(\\/.*)?$`,
//     "i"
//   );
//   if (bookingPublic.test(pathname)) {
//     return intlMiddleware(req);
//   }

//   // -----------------------------
//   // Locale detection
//   // -----------------------------
//   const locale = locales.find((loc) => pathname.startsWith(`/${loc}`));

//   if (locale) {
//     const trimmedPath = pathname.replace(`/${locale}`, "");
//     const isValidPath =
//       pathname.startsWith("/_next") || pathname.includes(".");

//     if (!trimmedPath || trimmedPath === "/") {
//       return NextResponse.redirect(
//         new URL(`/${locale}/protected/admin/dashboard`, req.url)
//       );
//     }
//   }

//   // -----------------------------
//   // Token expiry check
//   // -----------------------------
//   const token = await getToken({ req });
//   if (token) {
//     const currentTime = Math.floor(Date.now() / 1000);
//     if (typeof token.exp === "number" && token.exp < currentTime) {
//       return NextResponse.redirect(new URL("/auth/sign-in", req.url));
//     }
//   }

//   // -----------------------------
//   // Public vs Protected
//   // -----------------------------
//   const excludePattern = "^(/(" + locales.join("|") + "))?/protected/?.*?$";
//   const publicPathnameRegex = RegExp(excludePattern, "i");
//   const isPublicPage = !publicPathnameRegex.test(pathname);

//   if (isPublicPage) {
//     return intlMiddleware(req);
//   } else {
//     return (authMiddleware as any)(req);
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };


import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import withAuth from "next-auth/middleware";

export const locales = ["en", "th"] as const;

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: "th",
  localeDetection: false,
});

const authMiddleware = withAuth(
  async function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: async ({ token }) => {
        if (!token) return false;
        const currentTime = Math.floor(Date.now() / 1000);
        return typeof token.exp === "number" && token.exp > currentTime;
      },
    },
    pages: {
      signIn: "/auth/sign-in",
    },
  }
);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const locale = locales.find((loc) => pathname.startsWith(`/${loc}`)) || "th";

  // 1. ตรวจสอบว่าหน้าปัจจุบันเป็น Auth Page หรือไม่ (Guest Only)
  const authPages = ["/auth/sign-in", "/auth/sign-up", "/auth/reset-password", "/auth/forgot-password"];
  const isAuthPage = authPages.some(page => 
    pathname === page || pathname === `/${locale}${page}`
  );

  // --------------------------------------------------------
  // ⭐ 1) อนุญาตหน้า booking ของ customer โดยไม่ต้องล็อคอิน
  // --------------------------------------------------------
  const bookingPublic = new RegExp(
    `^/(${locales.join("|")})/protected/shop/([^/]+)/booking(\\/.*)?$`,
    "i"
  );
  if (bookingPublic.test(pathname)) {
    return intlMiddleware(req);
  }

  // -----------------------------
  // Token Logic & Redirection
  // -----------------------------
  const token = await getToken({ req });
  const currentTime = Math.floor(Date.now() / 1000);
  const isTokenValid = token && typeof token.exp === "number" && token.exp > currentTime;

  // ⭐ เพิ่ม Logic: ถ้ามี Token ที่ยังไม่หมดอายุ และพยายามเข้าหน้า Auth (Sign-in, Sign-up, etc.)
  if (isTokenValid && isAuthPage) {
    return NextResponse.redirect(
      new URL(`/${locale}/protected/admin/dashboard`, req.url)
    );
  }

  // กรณี Token หมดอายุ (Redirect ไป sign-in)
  if (token && !isTokenValid) {
    return NextResponse.redirect(new URL(`/${locale}/auth/sign-in`, req.url));
  }

  // -----------------------------
  // Locale detection & Root Redirect
  // -----------------------------
  if (locales.some((loc) => pathname === `/${loc}`)) {
      return NextResponse.redirect(
        new URL(`/${locale}/protected/admin/dashboard`, req.url)
      );
  }

  // -----------------------------
  // Public vs Protected
  // -----------------------------
  const excludePattern = "^(/(" + locales.join("|") + "))?/protected/?.*?$";
  const publicPathnameRegex = RegExp(excludePattern, "i");
  const isProtectedPage = publicPathnameRegex.test(pathname);

  if (!isProtectedPage) {
    return intlMiddleware(req);
  } else {
    // ใช้ authMiddleware สำหรับหน้าที่ต้องใช้ Token เท่านั้น
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};