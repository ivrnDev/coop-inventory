import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const skeletonCards = new Array(8).fill(null);
  return (
    <section className="h-user-main-mobile md:h-user-main pt-16 md:pt-9 md:w-[70%] md:mt-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 h-[28rem] md:h-[29rem] w-full px-6 md:px-8 overflow-y-auto">
        {skeletonCards.map((v, i) => (
          <Skeleton
            key={i}
            className="bg-white overflow-hidden h-64 w-full shadow-xl rounded-lg flex flex-col p-2 hover:opacity-80 flex-1 md:h-72"
          >
            <Skeleton className="relative w-full h-32 overflow-hidden rounded-md border border-black" />
            <div className="mt-3 px-1">
              <Skeleton className="h-4 mt-2 w-full shadow-sm bg-slate-300" />
              <Skeleton className="h-4 mt-2 w-full shadow-sm bg-slate-300" />
              <Skeleton className="h-4 mt-2 w-full shadow-sm bg-slate-300" />
            </div>
          </Skeleton>
        ))}
      </div>
    </section>
  );
}
