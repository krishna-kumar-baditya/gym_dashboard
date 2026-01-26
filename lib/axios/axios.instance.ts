import axios from "axios"

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  },
})

export default axiosInstance
