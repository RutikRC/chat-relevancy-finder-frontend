import React from "react";
import { useFetchRoomsQuery } from "../store/store";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const menuItems = [
    { id: 1, name: "Dashboard", icon: "home", active: true },
    { id: 2, name: "Classes", icon: "book" },
    { id: 3, name: "Students", icon: "users" },
    { id: 4, name: "Settings", icon: "settings" },
  ];
  const navigate = useNavigate();

  const handleView = (record) => {
    navigate(`/questions-dashboard/${record?._id}`);
  };

  const handleCreate = () => {
    navigate('/create-meeting');
  }

  const {data} = useFetchRoomsQuery();
  console.log(data);
  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <span>Dashboard</span>
          </div>
          {/* <button className="logout-btn">Logout</button> */}
        </div>
      </nav>

      <div className="content-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`menu-item ${item.active ? "active" : ""}`}
              >
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-container">
            {/* Create Room Button */}
            <div className="create-room">
              <button className="create-btn" onClick={handleCreate}>
                <span>Create New Room</span>
              </button>
            </div>

            {/* Previous Classes */}
            <div className="previous-classes">
              <h2>Previous Classes</h2>
              <div className="class-list">
                {data?.map((classItem) => (
                  <div key={classItem.roomID} className="class-card">
                    <div className="class-info">
                      <h3>{classItem.topic}</h3>
                      <div className="questions-count">
                        {classItem.content} Content
                      </div>
                    </div>
                    <button 
                      className="view-btn"
                      onClick={() => handleView(classItem)}
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
