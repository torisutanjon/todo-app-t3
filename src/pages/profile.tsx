import Link from "next/link";
import Head from "next/head";
import { api } from "@/utils/api";
import { signOut } from "next-auth/react";

const ProfilePage = () => {
  const { data: profile, status } = api.profile.getAccountByID.useQuery();

  if (status === "loading") return <h2>Checking session please wait...</h2>;

  if (status === "error") {
    window.alert("No Session Found");
    return (window.location.href = "/");
  }

  const logoutHandler = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <>
      <Head>
        <title>{profile.profilename}</title>
      </Head>
      <div className="absolute left-0 top-0 flex h-screen w-screen flex-col items-center justify-center">
        <div className="absolute top-[25%] flex flex-col items-center">
          <p className="text-[32px] text-[#8A8A8A]">Hi!</p>
          <p className="text-[32px] text-black">{profile.name}</p>
        </div>
        <div className="absolute bottom-[10%] flex flex-col items-center justify-end md:bottom-[25%]">
          <button
            className="mb-[15px] h-[40px] w-[175px] bg-[#383838] text-[14px] text-white/75 md:h-[75px] md:w-[75px] md:rounded-[50%]"
            onClick={() => void logoutHandler()}
          >
            Logout
          </button>
          <Link href="/">
            <button className="h-[40px] w-[175px] bg-[#383838] text-[14px] text-white/75 md:h-[75px] md:w-[75px] md:rounded-[50%]">
              Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
