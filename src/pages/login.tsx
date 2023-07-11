import Link from "next/link";
import Head from "next/head";
import { api } from "@/utils/api";

interface UserTypes {
  id: string;
  email: string;
  username: string;
}

const LoginPage = () => {
  const mutation = api.profile.loginAccount.useMutation({
    onSuccess: (res: UserTypes) => {
      localStorage.setItem("userToken", JSON.stringify(res));
      window.alert("Login Success");
      window.location.href = "/";
    },
    onError: (err) => {
      window.alert(err.message);
    },
  });

  const loginHandler = () => {
    const username = document.getElementById(
      "username-input"
    ) as HTMLInputElement;
    const password = document.getElementById(
      "password-input"
    ) as HTMLInputElement;

    if (username.value === "" || password.value === "")
      return window.alert("Please fill all fields");

    mutation.mutate({
      username: username.value,
      password: password.value,
    });
  };

  return (
    <>
      <Head>
        <title>Login Account</title>
      </Head>
      <div className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center">
        <div className="flex h-[65%] w-[75%] flex-col items-center justify-between">
          <p className="text-[22px] font-bold text-black/50">Login As:</p>
          <div className="relative flex h-[20%] w-full flex-col items-center justify-between">
            <input
              type="text"
              className="h-[35px] w-full border-b-[1px] border-b-black/75 pl-[10px] outline-none"
              placeholder="Enter username or email"
              id="username-input"
            />
            <input
              type="password"
              className="h-[35px] w-full border-b-[1px] border-b-black/75 pl-[10px] outline-none"
              placeholder="Enter password"
              id="password-input"
            />
          </div>
          <Link href="/sign-up" className="text-[14px] text-black/50 underline">
            No Account Yet?
          </Link>
          <div className="relative flex h-[20%] w-full flex-col items-center justify-between">
            <button
              className="h-[40px] w-[70%] bg-[#383838] text-white/75"
              onClick={() => loginHandler()}
            >
              Login
            </button>
            <button
              className="h-[40px] w-[70%] bg-[#383838] text-white/75"
              onClick={() => (window.location.href = "/")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
