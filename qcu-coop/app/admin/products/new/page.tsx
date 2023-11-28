import CreateProductForm from "@/components/admin/products/forms/Createproduct";
const CreateProductPage = () => {
  return (
    <section className="h-admin-main p-10 overflow-auto">
      <div className="h-full border-black border rounded-md bg-white overflow-y-auto">
        <div className="bg-header-admin w-[100%] h-10 font-bold text-xl flex justify-center items-center text-white">
          CREATE PRODUCT
        </div>
        <div className="bg-white w-full h-[calc(100%-2.5rem)] oveflow-hidden">
          <CreateProductForm />
        </div>
      </div>
    </section>
  );
};

export default CreateProductPage;
