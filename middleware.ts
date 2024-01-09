export {default} from "next-auth/middleware"

// Secure the matching route
export const config = {matcher: ["/"]};