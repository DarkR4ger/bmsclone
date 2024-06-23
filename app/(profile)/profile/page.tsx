import BookingList from "@/components/ProfilePage/Bookings/BookingList";
import TheatreLists from "@/components/ProfilePage/Theatres/TheatreLists";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDataFromHeader } from "@/lib/headerdData";

const Profile = async() => {
  const user = await getDataFromHeader();
  return (
    <section>
      <h2 className="text-xl md:text-3xl mb-5 font-semibold">Profile</h2>
      <div>
        <Tabs defaultValue="bookings" className=''>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="font-semibold" value="bookings">Bookings</TabsTrigger>
            <TabsTrigger className="font-semibold" value="apply for theatres">Apply for Theatres</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings">
            <BookingList />
          </TabsContent>
          <TabsContent value="apply for theatres">
            <TheatreLists userId={user.id} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default Profile
