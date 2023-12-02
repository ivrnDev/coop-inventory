import { Skeleton } from "@/components/ui/skeleton";

const HomeLoading = () => {
  const skeletonCards = new Array(5).fill(null);
  const featuredSkeleton = new Array(4).fill(null);

  return (
    <>
      <section className="min-h-user-main-mobile md:min-h-user-main mb-9">
        <div id="home-container" className="flex flex-col h-full">
          <Skeleton className="h-40 md:h-96 bg-white" />
          <div className="bg-featured-background flex flex-col items-center justify-center p-5 h-64 md:h-96">
            <div
              id="featured-header"
              className="flex space-x-2 items-center text-xl md:text-4xl font-extrabold"
            >
              <h1 className="bg-white drop-shadow-xl shadow-xl rounded-sm text-[#F3C72E] w-fit h-fit p-1 select-none">
                FEATURED
              </h1>
              <p className="text-white select-none">PRODUCTS</p>
            </div>
            <Skeleton
              id="arrivals-container"
              className="bg-white mt-5 flex gap-10 p-3 w-full h-full rounded-2xl overflow-x-auto"
            >
              {featuredSkeleton &&
                featuredSkeleton.map((card, index) => (
                  <Skeleton
                    key={index}
                    className="flex flex-col bg-white rounded-md shadow-md hover:opacity-80 border-black"
                  >
                    <div className="relative h-full w-36 overflow-hidden flex flex-col md:w-60"></div>
                    <p className=" font-bold mt-2 text-center capitalize md:text-xl"></p>
                  </Skeleton>
                ))}
            </Skeleton>
          </div>
          <div className="bg-categories-background flex flex-col p-4 h-52 md:h-80">
            <h2 className="text-white font-bold text-2xl mb-3 md:text-4xl select-none ">
              Categories
            </h2>
            <div className="rounded-md flex gap-3 h-full w-full overflow-x-auto md:gap-8">
              {skeletonCards &&
                skeletonCards.map((card, index) => (
                  <Skeleton
                    key={index}
                    className="flex flex-col bg-white rounded-md shadow-md hover:opacity-80"
                  >
                    <Skeleton className="relative h-full w-36 overflow-hidden flex flex-col md:w-60" />
                    <Skeleton className="mt-2 text-center capitalize md:text-xl"></Skeleton>
                  </Skeleton>
                ))}
            </div>
          </div>
        </div>
        <div
          id="products-container"
          className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4"
        ></div>
      </section>
    </>
  );
};

export default HomeLoading;
