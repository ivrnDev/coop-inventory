import LoginForm from "@/components/LoginForm";
import styles from "@/styles/pages/user/login.module.css"
const Login = () => {
  return (
    <section className={styles.section_form}>
      <LoginForm />
    </section>
  );
}

export default Login