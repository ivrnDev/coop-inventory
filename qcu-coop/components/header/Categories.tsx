import { getAllCategories } from "@/lib/api/categories";
import { CategoriesType } from "@/types/products/products";
import Link from "next/link";

const CategoriesSidebar = async () => {
  const categories: CategoriesType[] = await getAllCategories();
  return (
    <>
      <aside className="fixed flex flex-col top-10 left-3 mt-user-header-mobile md:mt-user-header w-32 h-fit ">
        <p className="font-bold text-md border-b-2 border-b-black whitespace-nowrap">
          All Categories
        </p>

        {categories && categories.length > 0 ? (
          <ul className="w-full text-black font-semibold mt-3 space-y-2">
            {/* <li>Pants</li>
            <li>Foods</li>
            <li>Accessories</li>
            <li>Shirts</li>
            <li>Papers</li> */}
            {categories.map((category) => (
              <Link
                key={category.category_id}
                href={`/products/${category.category_name}`}
              >
                <li>{category.category_name}</li>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg mt-4">No available categories</p>
        )}
      </aside>
    </>
  );
};

export default CategoriesSidebar;
