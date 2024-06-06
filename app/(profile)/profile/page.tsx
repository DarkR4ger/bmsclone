import TheatreLists from "@/components/ProfilePage/Theatres/TheatreLists";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  return (
    <section>
      <div>Hello profile page</div>
      <div>
        <Tabs defaultValue="bookings" className=''>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="font-semibold" value="bookings">Bookings</TabsTrigger>
            <TabsTrigger className="font-semibold" value="apply for theatres">Apply for Theatres</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings">
          </TabsContent>
          <TabsContent value="apply for theatres">
            <TheatreLists />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default Profile
