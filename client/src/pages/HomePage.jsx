import React from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { UserAuth } from "../context/AuthContext";

export default function HomePage() {
  const navigate = useNavigate();
  const [userinfo, setUserInfo] = UserAuth();

  const handleLogout = () => {
    setUserInfo({ email: null, id: null, loading: false });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <NavigationBar />
      {userinfo.id && (
        <div className="home-page">
          HomePage
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
}
