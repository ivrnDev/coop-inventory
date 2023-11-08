import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="ml-[35%] px-3 grid grid-cols-1 gap-4 place-items-center md:grid-cols-4">
      <div>
        <Skeleton
          className="h-screen w-screen shadow-xl rounded-lg flex flex-col items-center 
              p-5"
        >
          <div className="flex flex-col space-y-5 w-full pt-3">
            <Skeleton className="h-4 w-full shadow-sm bg-slate-300" />
            <Skeleton className="h-4 w-full shadow-sm bg-slate-300" />
            <Skeleton className="h-4 w-full shadow-sm bg-slate-300" />
          </div>
        </Skeleton>
      </div>
    </section>
  );
}
