import Banner from "@/components/user/carousel/Banner";
import CategoriesCarousel from "@/components/user/carousel/Categories";
import FeaturedCarousel from "@/components/user/carousel/Featured";
import { getAllCategories } from "@/lib/api/categories";
import { getProductByFeatured } from "@/lib/api/products";
import Image from "next/image";

const Home = async () => {
  const featured = await getProductByFeatured();
  const categories = await getAllCategories();
  return (
    <>
      <section className="min-h-user-main-mobile md:min-h-user-main mb-9">
        <div id="home-container" className="flex flex-col h-full">
          <div className=" h-40 bg-green-500">
            <Banner />
          </div>
          <div className="bg-featured-background flex flex-col items-center justify-center p-5 h-64">
            <div
              id="featured-header"
              className="flex space-x-2 items-center text-xl md:text-3xl font-extrabold"
            >
              <h1 className="bg-white drop-shadow-xl shadow-xl rounded-sm text-[#F3C72E] w-fit h-fit p-1">
                NEW
              </h1>
              <p className="text-white">ARRIVALS</p>
            </div>
            <div
              id="arrivals-container"
              className="bg-white mt-5 flex justify-center gap-10 p-3 w-full h-full rounded-2xl overflow-x-auto"
            >
              <FeaturedCarousel featured={featured} />
            </div>
          </div>
          <div className="bg-categories-background flex flex-col p-4 h-64">
            <h2 className="text-white font-bold text-2xl">Categories</h2>
            <div className="rounded-md flex gap-3 h-64 w-full overflow-x-auto">
              <CategoriesCarousel categories={categories} />
            </div>
          </div>
        </div>
        {/* <div id="products-container" className="bg-blue-700 h-72"></div> */}
      </section>
    </>
  );
};

export default Home;
