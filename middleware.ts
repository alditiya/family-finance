import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/transactions/:path*",
    "/api/report/:path*",
    "/api/invite/:path*",
    "/api/export/:path*",
    "/api/summary/:path*",
    
  ],
};
