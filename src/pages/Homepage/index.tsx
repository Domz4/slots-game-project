import Grid from "../../UI/Grid";
import { Sidebar } from "../../UI/Sidebar";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const mockFill = (num: number) => {
    return Array(num)
      .fill(0)
      .map((_, idx) => (
        <div key={Math.random()} className="box">
          {idx}
        </div>
      ));
  };
  return (
    <>
      <Grid size={250} className={styles.gridWrapper}>
        <Link to="/game">
          <img src="http://localhost:3000/assets/slots-icon.webp" className={styles.image} />
        </Link>

        {mockFill(10)}
      </Grid>
      <Sidebar />
    </>
  );
};
