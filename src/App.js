import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import Login from "./components/Login";

function App() {
  const isLogin = useSelector((store) => store.auth.isAuthenticated);
  const isDarkTheme = useSelector((store) => store.theme.isDarkTheme);

  return (
    <div
      className={`${isDarkTheme ? "bg-gray-800 min-h-screen" : "bg-gray-200 min-h-screen text-gray-800"}`}
    >
      <Header />
      {!isLogin ? <Login /> : <Outlet />}
    </div>
  );
}

export default App;
