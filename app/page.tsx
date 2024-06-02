import DashboardPage from "@/components/DashboardPage";
import { headers } from "next/headers";
import { UserData } from "@/components/DashboardPage";

export default async function Home() {
  const headerLists = headers();
  const jsonData = headerLists.get("data");
  const data: UserData = JSON.parse(jsonData!);
  const { id, username, email, isAdmin } = data!;

  return (
    <main className="container shadow-2xl mt-5 pt-5">
      <DashboardPage
        id={id}
        username={username}
        email={email}
        isAdmin={isAdmin}
      />
    </main>
  );
}
