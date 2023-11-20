import Albums from "@/components/user/carousel/Albums";
import Item from "@/components/user/render/item/Item";
import { getAllProducts, getProductById } from "@/lib/api/products";
import { Products } from "@/types/products/products";

type Params = {
  params: { id: number };
};

export async function generateStaticParams() {
  const products: Products[] = await getAllProducts();

  return products.map((p) => ({ id: String(p.product_id) }));
}

const ItemPage = async ({ params }: Params) => {
  const product_id = String(params?.id);
  const product = await getProductById(product_id);

  return (
    <section className="max-md:relative h-user-main-mobile mt-user-header-mobile pb-14 overflow-y-auto overflow-x-hidden md:h-user-main md:mt-user-header md:py-10 md:px-7">
      <div className="h-fit md:rounded-md md:flex md:w-full md:bg-white md:overflow-hidden md:space-x-5 md:p-8">
        <Albums albums={product[0]?.albums} image={product[0]?.display_image} />
        <Item product={product[0]} />
      </div>
      <div className="bg-white rounded-sm p-3 mt-4 max-md:mx-3 h-64 md:w-full md:p-4">
        <h1 className="text-xl font-bold md:text-2xl md:bg-[#EEEDED] md:p-3 ">
          Product Description
        </h1>
        <p className="mt-3 md:text-lg indent-8">
          {product[0]?.product_description}
        </p>
      </div>
    </section>
  );
};
export default ItemPage;
