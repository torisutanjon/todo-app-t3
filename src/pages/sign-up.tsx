import Link from "next/link";
import Head from "next/head";
import { api } from "@/utils/api";

const SignUp = () => {
  const mutation = api.profile.createAccount.useMutation({
    onSuccess: () => {
      window.alert("Account Created");
      window.location.href = "/login";
    },
    onError: (err) => {
      window.alert(err.message);
    },
  });

  const createAccountHandler = () => {
    const email = document.getElementById("email-input") as HTMLInputElement;
    const username = document.getElementById(
      "username-input"
    ) as HTMLInputElement;
    const password = document.getElementById(
      "password-input"
    ) as HTMLInputElement;
    const cpassword = document.getElementById(
      "cpassword-input"
    ) as HTMLInputElement;

    if (
      email.value === "" ||
      username.value === "" ||
      password.value === "" ||
      cpassword.value === ""
    )
      return window.alert("Please fill all fields");

    if (
      !email.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      return window.alert("Email is not valid");

    if (password.value !== cpassword.value)
      return window.alert("Password did not match");

    mutation.mutate({
      email: email.value,
      username: username.value,
      password: password.value,
    });
  };

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <div className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center">
        <div className="relative flex h-[65%] w-[75%] flex-col items-center justify-between">
          <p className="text-[22px] font-bold text-black/50">Create Account</p>
          <div className="relative flex h-[50%] w-full flex-col items-center justify-between">
            <input
              type="text"
              className="h-[35px] w-full border-b-[1px] border-b-black/75 pl-[10px] outline-none"
              placeholder="Enter email"
              id="email-input"
            />
            <input
              type="text"
              className="h-[35px] w-full border-b-[1px] border-b-black/75 pl-[10px] outline-none"
              placeholder="Enter username"
              id="username-input"
            />
            <input
              type="password"
              className="h-[35px] w-full border-b-[1px] border-b-black/75 pl-[10px] outline-none"
              placeholder="Enter password"
              id="password-input"
            />
            <input
              type="password"
              className="h-[35px] w-full border-b-[1px] border-b-black/75 pl-[10px] outline-none"
              placeholder="Confirm password"
              id="cpassword-input"
            />
          </div>
          <Link href="/login" className="text-[14px] text-black/50 underline">
            Already have an account?
          </Link>
          <div className="relative flex h-[20%] w-full flex-col items-center justify-between">
            <button
              className="h-[40px] w-[70%] bg-[#383838] text-white/75"
              onClick={() => createAccountHandler()}
            >
              Create Account
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

export default SignUp;
