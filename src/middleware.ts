// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// // Define role-specific route mappings
// const ROLE_ROUTES = {
//   teacher: '/etutor',
//   student: '/studentdashboard',
//   parent: '/adminparent'
// } as const;

// type UserRole = keyof typeof ROLE_ROUTES;

// // Check if a path is a protected route
// const isProtectedRoute = (path: string): boolean => {
//   return Object.values(ROLE_ROUTES).some(route => 
//     path.startsWith(route)
//   );
// };

// export default withAuth(
//   function middleware(req) {
//     const token = req.nextauth.token;
//     const path = req.nextUrl.pathname;
    
//     // If not logged in, redirect to signin for any protected route
//     if (!token && isProtectedRoute(path)) {
//       return NextResponse.redirect(new URL('/signin', req.url));
//     }

//     // If logged in, enforce strict role-based access
//     if (token?.role) {
//       const userRole = token.role as UserRole;
//       const allowedPath = ROLE_ROUTES[userRole];

//       // If current path is not the user's allowed path, redirect to their allowed path
//       if (path === '/' || !path.startsWith(allowedPath)) {
//         return NextResponse.redirect(new URL(allowedPath, req.url));
//       }
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ req, token }) => {
//         const path = req.nextUrl.pathname;

//         // Allow access to signin and non-protected routes
//         if (path === '/signin' || !isProtectedRoute(path)) {
//           return true;
//         }

//         if (!token) {
//           return false;
//         }

//         // For protected routes, strictly check role permissions
//         const userRole = token.role as UserRole;
//         const allowedPath = ROLE_ROUTES[userRole];
        
//         // Only allow access if the path matches the user's role
//         return path.startsWith(allowedPath);
//       },
//     },
//     pages: {
//       signIn: '/signin',
//     },
//   }
// );

// // Define protected routes in the matcher
// export const config = {
//   matcher: [
//     /*
//       * Match all request paths except for:
//       * - _next/static (static files)
//       * - _next/image (image optimization files)
//       * - favicon.ico (favicon file)
//       * - public folder
//       */
//     '/((?!_next/static|_next/image|favicon.ico|public).*)',
//   ]
// };


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|public).*)',
}