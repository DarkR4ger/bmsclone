import DashboardPage from "@/components/DashboardPage";
import { headers } from "next/headers";
import { UserData } from "@/components/DashboardPage";
import prisma from "@/lib/prisma";

export default async function Home() {
  const headerLists = headers();
  const jsonData = headerLists.get("data");
  const data: UserData = JSON.parse(jsonData!);
  const { username } = data!;

  const movies = await prisma.movie.findMany()

  return (
    <main className="mt-5 pt-5">
      <DashboardPage
        username={username}
        movies={movies}
      />
    </main>
  );
}
