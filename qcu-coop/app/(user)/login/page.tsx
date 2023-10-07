import LoginForm from "@/components/user/forms/Login";
import styles from "@/styles/pages/user/forms/login.module.css"
const Login = () => {
  return (
    <section className={styles.section_form}>
      <LoginForm />
    </section>
  );
}

export default Login