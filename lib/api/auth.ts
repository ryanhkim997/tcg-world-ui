/**
 * User registration response
 */
export interface AuthResponse {
  token?: string
  userId?: string
  email?: string
}

/**
 * Register a new user
 */
export async function register(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    )
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
