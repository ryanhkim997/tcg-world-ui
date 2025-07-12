const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

export async function pull({
  userId,
  packId,
  clientSeed,
  nonce,
}: {
  userId: string
  packId: string
  clientSeed: string
  nonce: number
}) {
  try {
    const res = await fetch(`${API_BASE}/pull`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, packId, clientSeed, nonce }),
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
