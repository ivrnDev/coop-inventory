import { getAllCategories } from "@/lib/api/categories";
import { CategoriesType } from "@/types/products/products";
import Link from "next/link";

const CategoriesSidebar = async () => {
  const categories: CategoriesType[] = await getAllCategories();
  return (
    <div className="flex flex-col p-5 items-center rounded-lg bg-blue-700 relative top-[50%]">
      <p className="text-black text-[1.2rem] font-bold border-b-2">
        CATEGORIES
      </p>

      {categories && categories.length > 0 ? (
        <ul className="w-[inherit] text-center uppercase text-black font-semibold mt-6">
          {categories.map((category) => (
            <Link href={`/products/${category.category_name}`}>
              <li key={category.category_id}>{category.category_name}</li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>NO AVAILABLE CATEGORIES</p>
      )}
    </div>
  );
};

export default CategoriesSidebar;
