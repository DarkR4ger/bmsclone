import DashboardPage from "@/components/DashboardPage";
import { headers } from "next/headers";

export default async function Home() {

  const headerLists = headers()
  const jsonData = headerLists.get('data')
  const data = JSON.parse(jsonData!)
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
