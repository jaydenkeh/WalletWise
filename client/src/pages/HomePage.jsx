import React from "react";
import NavigationBar from "../components/NavigationBar";

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

export default function HomePage() {
  return (
    <>
      <NavigationBar />
      <div className="home-page">
        HomePage
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}
