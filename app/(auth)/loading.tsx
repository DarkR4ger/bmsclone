import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="space-y-2 hidden md:flex md:flex-row md:gap-x-4">
        <Skeleton className="h-[300px] w-[300px]" />
        <Skeleton className="h-[300px] w-[300px]" />
      </div>
      <div className="space-y-2 md:hidden flex flex-col justify-center">
        <Skeleton className="h-[300px] w-[300px]" />
        <Skeleton className="h-[300px] w-[300px]" />
      </div>
    </div>
  );
}
