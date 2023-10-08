"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const QuantityInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const [quantity, setQuantity] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
      localStorage.setItem("quantity", String(newQuantity));
      const params = new URLSearchParams(searchParams);
      params.set("qty", String(newQuantity));
      router.push(`${pathname}?${params}`);
    }
  };
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    const params = new URLSearchParams(searchParams);
    params.set("qty", String(newQuantity));
    router.push(`${pathname}?${params}`);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      const params = new URLSearchParams(searchParams);
      params.set("qty", String(newQuantity));
      router.push(`${pathname}?${params}`);
    }
  };

  return (
    <div>
      <button
        onClick={handleIncrement}
        className="bg-green-500 p-2 w-10 h-10 text-[2rem] flex items-center justify-center"
      >
        +
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        className="w-10 text-center font-bold text-[1.2rem] whitespace-nowrap"
      />
      <button
        onClick={handleDecrement}
        className="bg-green-500 p-2 w-10 h-10 text-[2rem] flex items-center justify-center"
      >
        -
      </button>
    </div>
  );
};

export default QuantityInput;
