import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MoviesLists from "./MoviesLists";

const Admin = async () => {
  return (
    <section>
      <div>Hello admin page</div>
      <div>
        <Tabs defaultValue="movies" className=''>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="font-semibold" value="movies">Movies</TabsTrigger>
            <TabsTrigger className="font-semibold" value="theaters">Theaters</TabsTrigger>
          </TabsList>
          <TabsContent value="movies">
            <MoviesLists />
          </TabsContent>
          <TabsContent value="theaters">Theater tables</TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Admin;
