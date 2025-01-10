import React from "react";
import { useFetchRoomsQuery } from "../store/store";
// import "./Dashboard.css"; // Assuming the styles are in an external CSS file

const Dashboard = () => {
  // Dummy Data
  const menuItems = [
    { id: 1, name: "Dashboard", icon: "home", active: true },
    { id: 2, name: "Classes", icon: "book" },
    { id: 3, name: "Students", icon: "users" },
    { id: 4, name: "Settings", icon: "settings" },
  ];

  // const previousClasses = [
  //   { id: 1, title: "Math Class", questions: 10 },
  //   { id: 2, title: "Science Class", questions: 15 },
  //   { id: 3, title: "History Class", questions: 8 },
  // ];
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
          <button className="logout-btn">Logout</button>
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
              <button className="create-btn">
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
                    <button className="view-btn">View</button>
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
