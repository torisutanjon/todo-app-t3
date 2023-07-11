import { useRouter } from "next/router";
import Link from "next/link";

interface UserTypes {
  id: string;
  email: string;
  username: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const logoutHandler = () => {
    const token = localStorage.getItem("userToken");
    if (token === null) return;
    const data = JSON.parse(token) as UserTypes;
    if (data.id === id) {
      localStorage.removeItem("userToken");
      window.location.href = "/login";
    }
  };

  return (
    <div className="absolute left-0 top-0 flex h-screen w-screen flex-col items-center justify-center">
      <button
        className="relative h-[150px] w-[150px] rounded-[50%] bg-[#383838] text-[20px] text-white/75"
        onClick={() => logoutHandler()}
      >
        LOGOUT
      </button>
      <Link
        href="/"
        className="mt-[15px] text-[18px] font-medium text-black/75"
      >
        Back
      </Link>
    </div>
  );
};

export default ProfilePage;
