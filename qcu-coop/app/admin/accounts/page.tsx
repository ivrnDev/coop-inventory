import CreateAccount from "@/components/admin/accounts/forms/CreateAccount";
import UpdatePassword from "@/components/admin/accounts/forms/UpdatePassword";
import FilteredAdmins from "@/components/admin/accounts/render/FilteredAdmins";
import TrashArchive from "@/components/admin/accounts/render/TrashArchive";
import { getAllAdmin, getAllDeletedAdmin } from "@/lib/api/admin";
import { Admin, DeletedAdmin } from "@/types/admins/admins";

const Accounts = async () => {
  const admins: Admin[] = await getAllAdmin();
  const deletedAdmin: DeletedAdmin[] =  await getAllDeletedAdmin();
  return (
    <section className="h-admin-main p-6">
      <div className="relative border border-black h-full p-4 overflow-clip">
        <div>
          <div className="float-right flex gap-3">
            <CreateAccount />
            <UpdatePassword />
            <TrashArchive deletedAdmin={deletedAdmin} />
          </div>
          <FilteredAdmins admins={admins} />
        </div>
      </div>
    </section>
  );
};

export default Accounts;
