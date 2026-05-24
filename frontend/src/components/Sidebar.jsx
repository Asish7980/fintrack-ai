import { useState } from "react";

import { FaChartPie, FaWallet, FaRobot, FaBars, FaTimes } from "react-icons/fa";

import { FaSignOutAlt } from "react-icons/fa";

function Sidebar({ activeTab, setActiveTab }) {
  const [open, setOpen] = useState(false);
  const logout = () => {

  const confirmLogout =
    window.confirm(
      'Are you sure you want to logout?'
    );

  if (confirmLogout) {

    localStorage.removeItem('token');

    localStorage.removeItem('email');

    window.location.href = '/';

  }

};

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaChartPie />,
    },
    {
      name: "Transactions",
      icon: <FaWallet />,
    },
    {
      name: "AI Assistant",
      icon: <FaRobot />,
    },
  ];

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div
        className="
        lg:hidden
        fixed
        top-0
        left-0
        right-0
        z-50
        bg-gray-900
        text-white
        flex
        justify-between
        items-center
        px-6
        py-4
        shadow-lg
      "
      >
        <h1 className="text-2xl font-bold text-blue-400">FinTrack AI</h1>

        <button onClick={() => setOpen(!open)} className="text-2xl">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`
          fixed
          top-0
          left-0
          h-full
          w-64
          bg-gray-900
          text-white
          p-6
          z-40
          transform
          transition-transform
          duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >
        {/* LOGO */}
        <h1
          className="
          text-3xl
          font-bold
          mb-12
          text-blue-400
          hidden
          lg:block
        "
        >
          FinTrack AI
        </h1>

        {/* MENU */}
        <ul
          className="
          space-y-4
          mt-20
          lg:mt-0
        "
        >
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);

                setOpen(false);
              }}
              className={`
                flex
                items-center
                gap-4
                p-4
                rounded-2xl
                cursor-pointer
                transition-all
                duration-300

                ${activeTab === item.name ? "bg-blue-600" : "hover:bg-gray-800"}
              `}
            >
              {item.icon}

              {item.name}
            </li>
          ))}

          {/* LOGOUT BUTTON */}
          <button
            onClick={logout}
            className="
    mt-10
    w-full
    bg-red-500
    hover:bg-red-600
    text-white
    p-4
    rounded-2xl
    flex
    items-center
    justify-center
    gap-3
    transition-all
  "
          >
            <FaSignOutAlt />
            Logout
          </button>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
