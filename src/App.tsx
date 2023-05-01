import React, { useEffect, useState } from "react";
import "./App.css";
import { HomePage } from "./pages/Homepage";
import { setUser } from "./store/authSlice";
import { useAppDispatch } from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import { Game } from "./pages/Games/Game";
import UserSettings from "./pages/User";
import { setToken } from "./services/authAPI";
import { Header } from "./UI/Header";
import { logout } from "./store/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { AuthForm } from "./components/homepage/authForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/game",
    element: <Game />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/settings",
    element: <UserSettings />,
  },
]);

function App() {
  const [activeTab, setActiveTab] = useState<"Login" | "Register">("Login");
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const dispatch = useAppDispatch();

  const user = useSelector((state: RootState) => state.auth.auth);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setToken(user.token);
      dispatch(setUser(user));
    }
  }, []);
  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(logout());
  };
  const toggleAuth = (type: "Login" | "Register") => {
    setActiveTab(type);
    setTimeout(() => {
      setLoginModalVisible(!loginModalVisible);
    }, 100);
  };
  return (
    <div className="App">
      <Header
        onLogin={() => toggleAuth("Login")}
        onLogout={handleLogout}
        onRegister={() => toggleAuth("Register")}
        user={user}
      />
      <AuthForm
        isVisible={loginModalVisible}
        toggleAuth={() => toggleAuth(activeTab)}
        activeTab={activeTab}
      />

      <RouterProvider router={router} />
    </div>
  );
}
export default App;
