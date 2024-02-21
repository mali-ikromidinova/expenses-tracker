import { useEffect, useState } from "react";
import styles from "./Login.module.css";
// import PageNav from "../components/PageNav";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useAuth } from "../../context/FakeAuthContext";
import Logo from "../../components/Logo/Logo";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("mali@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/dashboard", { replace: "true" });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <div className={styles.centerPart}>
        <Logo type="red" />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className={styles.btnCentered}>
            <Button variation="primary">Login</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
