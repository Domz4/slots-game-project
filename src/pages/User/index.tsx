import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { RootState } from "../../store/store";
import { addBalance } from "../../store/authSlice";
import styles from "./styles.module.css";

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
    <div className={styles.page}>
      <h2>Account Settings</h2>
      <p>Username: {user.username}</p>
      <p>Name: {user.name}</p>
      <p>Current Balance: ${user.balance.toFixed(2)}</p>
      <div>
        <h3>Add Balance</h3>
        <input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <button onClick={handleAddBalance}>Add Balance</button>
      </div>
    </div>
  );
};

export default UserSettings;
