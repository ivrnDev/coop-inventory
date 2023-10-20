import Link from "next/link";

const LoginForm = () => {
  return (
    <form className="">
      <label htmlFor="username">Username</label>
      <input type="text" name="username" className="" />
      <label htmlFor="password">Password</label>
      <input type="text" name="password" className="" />
      <Link href="./admin/dashboard" className="">
        GO TO ADMIN
      </Link>
    </form>
  );
};

export default LoginForm;
