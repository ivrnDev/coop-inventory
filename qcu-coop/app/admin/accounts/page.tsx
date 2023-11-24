import CreateAccount from "@/components/admin/accounts/forms/CreateAccount";
import UpdatePassword from "@/components/admin/accounts/forms/UpdatePassword";
import FilteredAdmins from "@/components/admin/accounts/render/FilteredAdmins";
import { getAllAdmin } from "@/lib/api/admin";
import { Admin } from "@/types/admins/admins";

const Accounts = async () => {
  const admins: Admin[] = await getAllAdmin();
  return (
    <section className="h-admin-main p-6">
      <div className="relative border border-black h-full p-4 overflow-clip">
        <div>
          <div className="float-right flex gap-3">
            <CreateAccount />
            <UpdatePassword />
          </div>
          <FilteredAdmins admins={admins} />
        </div>
      </div>
    </section>
  );
};

export default Accounts;
