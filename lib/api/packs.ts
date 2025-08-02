import { Pagination } from "@/types/pagination"

export async function findPacks(pagination: Pagination) {
  const { page, limit } = pagination
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/packs?page=${page}&limit=${limit}`,
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

export async function findPackById(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/packs/${id}`,
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
