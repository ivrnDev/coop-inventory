import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const skeletonCards = new Array(8).fill(null);
  return (
    <section className="ml-[35%] px-3 grid grid-cols-1 gap-4 place-items-center md:grid-cols-4">
      {skeletonCards.map(() => (
        <>
          <div className="">
            <Skeleton
              className="h-60 w-40 shadow-xl rounded-lg flex flex-col items-center 
              p-5"
            >
              <Skeleton className="relative w-full h-28 border border-black" />
              <div className="flex flex-col space-y-5 w-full pt-3">
                <Skeleton className="h-4 w-full shadow-sm bg-slate-300" />
                <Skeleton className="h-4 w-full shadow-sm bg-slate-300" />
                <Skeleton className="h-4 w-full shadow-sm bg-slate-300" />
              </div>
            </Skeleton>
          </div>
        </>
      ))}
    </section>
  );
}
