import axios from "axios";
import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import TotalIncomeTable from "../components/income/TotalIncomeTable";
import AddAccountForm from "../components/income/AddAccountForm";

export default function HomePage() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

  const [userinfo, setUserInfo] = useState({ email: "", id: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/login/me",
          config
        );
        console.log(token);
        console.log(response);
        setUserInfo({
          email: response.data.data.user.email,
          id: response.data.data.user.id,
        });
        console.log(userinfo);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <>
      {userinfo?.id && (
        <div className="home-page">
          <NavigationBar />
          <button onClick={handleLogout}>Logout</button>
          <br />
          HomePage
          <TotalIncomeTable />
          <br />
          <AddAccountForm />
        </div>
      )}
    </>
  );
}
