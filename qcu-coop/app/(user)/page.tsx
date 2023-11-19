import Banner from "@/components/user/carousel/Banner";
import CategoriesCarousel from "@/components/user/carousel/Categories";
import FeaturedCarousel from "@/components/user/carousel/Featured";
import RenderProducts from "@/components/user/render/Products";
import { getAllCategories } from "@/lib/api/categories";
import {  getAllProducts, getProductByFeatured } from "@/lib/api/products";
import { Categories, Featured, Products } from "@/types/products/products";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Home = async ({ searchParams }: Props) => {
  const search = searchParams?.search as string;
  const products: Products[] = await getAllProducts(null, true);
  const featured: Featured[] = await getProductByFeatured();
  const categories: Categories[] = await getAllCategories();
  return (
    <>
      <section className="min-h-user-main-mobile md:min-h-user-main mb-9">
        <div id="home-container" className="flex flex-col h-full">
          <div className=" h-40 md:h-96 bg-green-500">
            <Banner />
          </div>
          <div className="bg-featured-background flex flex-col items-center justify-center p-5 h-64 md:h-96">
            <div
              id="featured-header"
              className="flex space-x-2 items-center text-xl md:text-4xl font-extrabold"
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
          <div className="bg-categories-background flex flex-col p-4 h-64 md:h-80">
            <h2 className="text-white font-bold text-2xl mb-3 md:text-4xl">
              Categories
            </h2>
            <div className="rounded-md flex gap-3 justify-center h-64 w-full overflow-x-auto md:gap-8">
              <CategoriesCarousel categories={categories} />
            </div>
          </div>
        </div>
        <div
          id="products-container"
          className="mt-5 grid grid-cols-3 md:grid-cols-6 gap-4 p-4"
        >
          <RenderProducts search={search} products={products} />
        </div>
      </section>
    </>
  );
};

export default Home;
