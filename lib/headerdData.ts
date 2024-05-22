'use server'
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { UserData } from "@/components/DashboardPage"

export const getDataFromHeader = async () : Promise<UserData> => {
  if(!headers().has('data')){
    redirect('/login')
  }
  const jsonData = headers().get('data')!
  const data: UserData = JSON.parse(jsonData);
  return data
}

