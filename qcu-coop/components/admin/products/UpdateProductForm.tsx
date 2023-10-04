"use client";
import { useState } from "react";

interface Customer {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
}

const UpdateProductForm = () => {
  const [formData, setFormData] = useState<Customer>({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  return (
    <div className="flex place-items-center justify-center h-screen bg-slate-600">
      <div>
        <h1 className="text-center">CREATE CUSTOMER</h1>
        <form
          method="POST"
          action=""
          className="bg-red-500 p-10 flex flex-col gap-5 w-fit h-fit "
        >
          <div>
            <label>Name</label>
            <input type="text" name="customer_name" onChange={handleChange} />
          </div>

          <div>
            <label>Phone</label>
            <input type="text" name="customer_phone" onChange={handleChange} />
          </div>

          <div>
            <label>Email</label>
            <input type="text" name="customer_email" onChange={handleChange} />
          </div>

          <button type="submit">CREATE NOW</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductForm;
