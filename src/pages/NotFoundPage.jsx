import { Link } from "react-router-dom";
import styles from "../App.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.app}>
      <h1>404 - Page Not Found</h1>
      <Link to="/" className={styles.backButton}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
