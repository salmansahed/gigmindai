import { serverUserSession } from "@/lib/serverUserSession";
import ManageGigsTable from "./ManageGigsTable";
import { getServerJWTToken } from "@/lib/getServerJWTToken";

const ManageGigsPage = async () => {
  const session = await serverUserSession();
  const authorId = session?.user?.id;

  const token = await getServerJWTToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-gigs/${authorId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const initialJobs = await res.json();

  return (
    <div className="px-4 min-h-screen pt-28 pb-12 bg-black">
      <ManageGigsTable authorId={authorId} initialJobs={initialJobs} />
    </div>
  );
};

export default ManageGigsPage;
