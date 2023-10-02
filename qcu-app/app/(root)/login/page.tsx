import styles from "@/styles/user/login.module.css";
import Link from "next/link";
const Login = () => {
  return (
    <div className={styles.main}>
      <form action="" className={styles.form}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" />
        <button>SUBMIT</button>
        <Link href="/admin/dashboard">GO TO ADMIN</Link>
      </form>
    </div>
  );
};

export default Login;
