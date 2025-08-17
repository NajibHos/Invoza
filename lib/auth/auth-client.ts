// The client-side library helps us interact with the auth server

import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000"
})