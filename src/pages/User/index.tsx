import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { RootState } from "../../store/store";
import { addBalance } from "../../store/authSlice";
import styles from "./styles.module.css";
import { Button } from "../../UI/Button";

const UserSettings: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.auth);
  const handleAddBalance = async () => {
    try {
      await dispatch(addBalance(amount));
      setAmount(0);
    } catch (error) {
      console.error(error);
    }
  };
  if (!user) {
    return <div>Please log in to view your account settings.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.page}>
        <h2 className={styles.mainTitle}>Account Settings</h2>
        <p className={styles.username}>Username: {user.username}</p>
        <p className={styles.name}>Name: {user.name}</p>
        <p className={styles.balance}>Current Balance: ${user.balance.toFixed(2)}</p>
        <div className={styles.balanceControl}>
          <input
            className={styles.inputBalance}
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
          <Button variant="secondary" onClick={handleAddBalance}>
            Add Balance
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
