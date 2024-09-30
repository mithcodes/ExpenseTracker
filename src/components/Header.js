import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { toggleTheme } from "../store/themeSlice";

const Header = () => {
  const [profile, setProfile] = useState(false);
  const token_ID = useSelector((store) => store.auth.tokenID);
  const [displayName, setDisplayName] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.auth.isAuthenticated);
  const isDarkTheme = useSelector((store) => store.theme.isDarkTheme);

  const handleProfile = () => {
    setProfile(!profile);
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
           "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBZp6vd_pxJuxAz_Y-nZhGbPaHFEUTPcBE",
          //"https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBZp6vd_pxJuxAz_Y-nZhGbPaHFEUTPcBE",
          {
            method: "POST",
            body: JSON.stringify({ idToken: token_ID }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const data1 = data.users[0];
          data1.displayName
            ? setProfileComplete(true)
            : setProfileComplete(false);
          setDisplayName(data1.displayName);
          setPhotoURL(data1.photoUrl);
        } else {
          const data1 = await response.json();
          const msg = data1.error.message;
          console.log(msg);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    isLogin && fetchData();
  }, [token_ID, isLogin]);

  const handleLogout = () => {
    localStorage.removeItem("idToken");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <div
        className={`${
          isDarkTheme ? "bg-gray-700 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-evenly text-xl shadow-md w-full font-medium">
          <div className="flex w-3/4 mx-auto md:mx-0 md:w-1/4 justify-evenly py-4 md:py-10">
            <Link to="/home">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About us</Link>
          </div>
          {!profileComplete && isLogin ? (
            <h1 className="text-lg text-center m-1 p-2 md:p-4 md:m-6">
              Your profile is incomplete.{" "}
              <button
                onClick={handleProfile}
                className="text-blue-500 font-semibold"
              >
                Complete Now.
              </button>
            </h1>
          ) : (
            ""
          )}
          {isLogin && (
            <div className="flex mx-auto md:mx-0 py-5">
              {profileComplete && (
                <>
                  <img
                    className="w-12 h-12 mt-3 mx-2 rounded-full"
                    src={photoURL}
                    alt="logo"
                  />
                  <h1 className="py-6">{displayName}</h1>
                </>
              )}
              <button
                className="mx-4 px-4 m-4 text-lg bg-blue-500 text-white font-semibold shadow-md rounded-md hover:bg-blue-600"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="flex m-4 mx-auto bg-blue-500 text-white shadow-md rounded-md p-2 font-semibold hover:bg-blue-600"
                onClick={handleToggleTheme}
              >
                {isDarkTheme ? "☀️" : "🌙"}
              </button>
            </div>
          )}
        </div>
      </div>
      {profile && <Profile handleProfile={handleProfile} />}
    </div>
  );
};

export default Header;
