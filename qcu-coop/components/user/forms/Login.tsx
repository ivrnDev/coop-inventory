import Link from "next/link";
import styles from "@/styles/components/loginform.module.css";
const LoginForm = () => {
  return (
    <form className={styles.form}>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" className={styles.input} />
      <label htmlFor="password">Password</label>
      <input type="text" name="password" className={styles.input} />
      <Link href="./admin/dashboard" className={styles.link}>
        GO TO ADMIN
      </Link>
    </form>
  );
};

export default LoginForm;
