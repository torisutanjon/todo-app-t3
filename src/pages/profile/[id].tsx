import Link from "next/link";
import Head from "next/head";

import type {
  NextPage,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  GetStaticPaths,
} from "next";

import { ssgHelper } from "@/server/helpers/ssgHelper";
import { api } from "@/utils/api";
import { signOut } from "next-auth/react";

const ProfilePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const { data: profile } = api.profile.getAccountByID.useQuery({ id });

  console.log(profile);

  if (profile === null || profile === undefined)
    return <h1>Error Fetching Userinfo</h1>;

  const logoutHandler = () => {
    void signOut();
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
        <div className="absolute bottom-[10%] flex flex-col items-center justify-end">
          <button className="mb-[15px] h-[40px] w-[175px] bg-[#383838] text-[14px] text-white/75">
            Verify Email
          </button>
          <button
            className="mb-[15px] h-[40px] w-[175px] bg-[#383838] text-[14px] text-white/75"
            onClick={() => logoutHandler()}
          >
            Logout
          </button>
          <Link href="/">
            <button className="h-[40px] w-[175px] bg-[#383838] text-[14px] text-white/75">
              Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const id = context.params?.id;

  if (id === null || id === undefined)
    return {
      redirect: {
        destination: "/",
      },
    };

  const ssg = ssgHelper();
  await ssg.profile.getAccountByID.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export default ProfilePage;
