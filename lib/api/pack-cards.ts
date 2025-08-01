import { Pagination } from "@/types/pagination"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

export async function findAllPackCards(pagination: Pagination) {
  const { page, limit } = pagination
  try {
    const res = await fetch(
      `${API_BASE}/pack-cards?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
