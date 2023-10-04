"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { CustomerType } from "@/types/customers/customers";
import { createCustomer } from "@/lib/api/customers";

const CreateProductForm = () => {
  const [formData, setFormData] = useState<CustomerType>({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createCustomer(formData);

      if (response.status === 201) {
        console.log("Customer created successfully");
        setFormData({
          customer_name: "",
          customer_phone: "",
          customer_email: "",
        });
        console.log(response.data);
      } else {
        console.error("Failed to create customer");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex place-items-center justify-center h-screen bg-slate-600">
      <div>
        <h1 className="text-center">CREATE CUSTOMER</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-red-500 p-10 flex flex-col gap-5 w-fit h-fit "
        >
          <div>
            <label>Name</label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Phone</label>
            <input
              type="text"
              name="customer_phone"
              value={formData.customer_phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="text"
              name="customer_email"
              value={formData.customer_email}
              onChange={handleChange}
            />
          </div>

          <button type="submit">CREATE NOW</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
