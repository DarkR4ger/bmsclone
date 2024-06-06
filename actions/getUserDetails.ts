'use client'
import { useAppSelector } from "@/lib/reduxhook"

export const getUserDetails = () => {
  const user = useAppSelector((state) => state.user)
  return user
}
