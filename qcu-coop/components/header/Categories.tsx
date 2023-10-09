import { getAllCategories } from "@/lib/api/categories";
import { CategoriesType } from "@/types/products/products";
import Link from "next/link";

const CategoriesSidebar = async () => {
  const categories: CategoriesType[] = await getAllCategories();
  return (
    <>
      <aside className="flex flex-col p-5 mt-[120px] items-center rounded-lg bg-blue-700 fixed top-1/2 -translate-y-1/2 left-6">
        <p className="text-black text-[1.2rem] font-bold border-b-2">
          CATEGORIES
        </p>

        {categories && categories.length > 0 ? (
          <ul className="w-[inherit] text-center uppercase text-black font-semibold mt-6">
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
          <p>NO AVAILABLE CATEGORIES</p>
        )}
      </aside>
    </>
  );
};

export default CategoriesSidebar;
