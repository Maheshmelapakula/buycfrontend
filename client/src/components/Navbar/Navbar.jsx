import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={`${styles.navbar} bg-blue-500 p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          <Link to="/">BUYC</Link>
        </h1>
        <div className="flex gap-4">
          <Link to="/login" className={`${styles.navLink} text-white`}>
            Login
          </Link>
          <Link to="/signup" className={`${styles.navLink} text-white`}>
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
