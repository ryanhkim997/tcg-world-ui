import { Pagination } from "@/types/pagination"

export async function findAllPackCards(pagination: Pagination) {
  const { page, limit } = pagination
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/pack-cards?page=${page}&limit=${limit}`,
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
