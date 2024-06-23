"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TheatreDataType } from "../TheatreLists";
import { Separator } from "@/components/ui/separator";
import {  useState } from "react";
import ShowLists from "./ShowLists";
import { ArrowLeft } from "lucide-react";
import ShowForm from "./ShowForm";

type ViewType = "table" | "form";

const ShowModel = ({
  id,
  name,
}: TheatreDataType) => {
  const [view, setView] = useState<ViewType>("table");

  const handleButtonClick = () => {
    if (view === "table") {
      setView("form");
    } else {
      setView("table");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Shows</Button>
      </DialogTrigger>
      <DialogContent className="sm:w-full md:max-w-5xl lg:max-w-7xl overflow-scroll">
        <DialogHeader className="">
          <DialogTitle className="text-md md:text-xl font-semibold">
            THEATRE&#58; {name}
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="font-medium text-lg">
            {view === "table" ? "Shows" : "Add Show"}
          </div>
          <Button className="" onClick={handleButtonClick}>
            {view === "table" ? (
              "Add Show"
            ) : (
              <div className="flex items-center gap-x-2">
                <ArrowLeft />
                back
              </div>
            )}
          </Button>
        </div>
        {view === "table" ? <ShowLists id={id} /> : <ShowForm id={id} />}
      </DialogContent>
    </Dialog>
  );
};

export default ShowModel;
