
import Authentication from "@/lib/auth"
import { redirect } from "next/navigation"

const Admin = async() => {
  const res = await Authentication();
  const {isAdmin} = res.data!;

  return (
    <section>
      <div>Hello admin page</div>
    </section>
  )
}

export default Admin 
