import React from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { UserAuth } from "../context/AuthContext";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

export default function HomePage() {
  const navigate = useNavigate();
  const [userinfo, setUserInfo] = UserAuth();

  const handleLogout = () => {
    setUserInfo({ email: null, id: null, loading: false });
    localStorage.removeItem("token");
    navigate("/");
  };

  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];

  return (
    <>
      <NavigationBar />
      {userinfo.id && (
        <div className="home-page">
          HomePage
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              data={data01}
              cx={200}
              cy={200}
              outerRadius={120}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              data={data01}
              cx={200}
              cy={200}
              outerRadius={120}
              fill="#f0a911"
              label
            />
            <Tooltip />
          </PieChart>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
}
