import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MoviesLists from "@/components/AdminPage/Movies/MoviesLists";
import AdminTheatreLists from "@/components/AdminPage/Theatres/TheatreLists";

const Admin = async () => {
  return (
    <section>
      <h2 className="text-xl md:text-3xl font-semibold">Admin page</h2>
      <div>
        <Tabs defaultValue="movies" className=''>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="font-semibold" value="movies">Movies</TabsTrigger>
            <TabsTrigger className="font-semibold" value="theaters">Theaters</TabsTrigger>
          </TabsList>
          <TabsContent value="movies">
            <MoviesLists />
          </TabsContent>
          <TabsContent value="theaters">
            <AdminTheatreLists />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Admin;
