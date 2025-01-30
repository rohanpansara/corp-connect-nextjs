import { FaUserCog, FaShieldAlt, FaBell, FaChartPie, FaDatabase, FaGlobe } from "react-icons/fa";

export const widgets = [
  {
    title: "User Settings",
    icon: <FaUserCog />,
    bgColor: "bg-blue-500 text-white",
  },
  {
    title: "Security",
    icon: <FaShieldAlt />,
    bgColor: "bg-red-500 text-white",
  },
  {
    title: "Notifications",
    icon: <FaBell />,
    bgColor: "bg-yellow-500 text-white",
  },
  {
    title: "Analytics",
    icon: <FaChartPie />,
    bgColor: "bg-green-500 text-white",
  },
  {
    title: "Database",
    icon: <FaDatabase />,
    bgColor: "bg-purple-500 text-white",
  },
  {
    title: "Global Settings",
    icon: <FaGlobe />,
    bgColor: "bg-gray-500 text-white",
  },
];
