import React from "react";
import "../styles/Home.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ContentArea from "./ContentArea";
import { useNavigation } from "../hooks/useNavigation";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Settings,
  Users,
  BarChart,
  Mail,
  Pen,
  HelpCircle,
  ChartBar,
  User2Icon,} from "lucide-react";
const Home = () => {
  const pages = [
    { id: "Dashboard", name: "Dashboard", icon: HomeIcon, route: "dashboard" },
    { id: "Finance", name: "Finance", icon: ChartBar, route: "finance" },
    { id: "analytics", name: "Analytics", icon: BarChart, route: "analytics" },
    { id: "users", name: "Users", icon: Users, route: "users" },
    { id: "Page4", name: "Messages", icon: Mail, route: "page4" },
    { id: "Page5", name: "Settings", icon: Settings, route: "page5" },
    { id: "Page7", name: "Notifications", icon: Mail, route: "page7" },
    { id: "profile", name: "Profile", icon: User2Icon, route: "profile" },
    { id: "Page9", name: "Help", icon: HelpCircle, route: "page9" },
    { id: "Page10", name: "Feedback", icon: Pen, route: "page10" },
  ];
  const navigate = useNavigate();
  const { handleNavigation, isActivePage } = useNavigation(pages);
  const currentPage = pages.find((page) => isActivePage(page.route));

  if (!currentPage) {
    navigate(`/home/${pages[0].route}`);
  }
  const isAnyPageActive = pages.some((page) => isActivePage(page.route));

  return (
      <div className="app-container">
        {/* Header */}
        <Header />

        <div className="d-flex main-content">
          {/* Sidebar */}
          <Sidebar
            pages={pages}
            handleNavigation={handleNavigation}
            isActivePage={isActivePage}
          />

          {/* Main Content */}
          <ContentArea isAnyPageActive={isAnyPageActive} />
        </div>
      </div>
  );
};

export default Home;
