import CreateAccount from "@/components/admin/accounts/forms/CreateAccount";
import FilteredAdmins from "@/components/admin/accounts/render/FilteredAdmins";
import { getAllAdmin } from "@/lib/api/admin";
import { Admin } from "@/types/admins/admins";

const Accounts = async () => {
  const admins: Admin[] = await getAllAdmin();
  return (
    <section className="h-admin-main p-6">
      <div className="border border-black h-full p-4 overflow-clip">
        <div>
          <div className="float-right">
            <CreateAccount />
          </div>
          <FilteredAdmins admins={admins} />
        </div>
      </div>
    </section>
  );
};

export default Accounts;
