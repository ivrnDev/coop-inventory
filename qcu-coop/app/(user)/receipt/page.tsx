import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";

const ReceiptPage = () => {
  return (
    <section className="h-user-main-mobile p-10 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full h-full max-w-xl">
        <div className="bg-green-600 w-full h-24 rounded-t-lg flex justify-center items-center gap-3">
          <BadgeCheck color="white" width={50} height={50} />
          <h1 className="font-bold text-xl text-white">ORDER SUCCESS</h1>
        </div>
        <div className="flex flex-col justify-center items-center h-[calc(100%-6rem)] gap-3">
          <p className="font-semibold text-2xl text-center">
            Thank you for purchasing our product.
          </p>
          <p className=" text-slate-500 text-lg text-center">
            Please check your email for your order receipt.
          </p>
          <Link href="/">
            <Button variant="link" className="text-lg">
              GO BACK TO HOME
            </Button>
          </Link>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default ReceiptPage;
