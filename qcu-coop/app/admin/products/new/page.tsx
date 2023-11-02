import CreateProductForm from "@/components/admin/products/forms/Createproduct";
const CreateProductPage = () => {
  return (
    <section className="bg-red-300 relative w-full h-[500px] rounded-md flex items-center border border-solid border-black overflow-hidden">
      <div className="absolute bg-header-admin w-[100%] h-10 top-0 left-0 justify-center text-white text-[1.2rem] rounded-t-md flex items-center font-bold">
        CREATE PRODUCT
      </div>
      <div className="bg-white w-full h-[calc(100%-2.5rem)] mt-10 oveflow-hidden py-5 px-9">
        <CreateProductForm />
      </div>
    </section>
  );
};

export default CreateProductPage;
