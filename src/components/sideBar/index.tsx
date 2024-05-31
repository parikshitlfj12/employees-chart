import React, { useState } from "react";
import "./sideBar.css";
import Explore from "../../assets/Explore.svg";
import Dashboard from "../../assets/message-text.svg";
import Profile from "../../assets/Profile.svg";


enum TABS {
  MESSAGES = "MESSAGES",
  DASHBOARD = "DASHBOARD",
  ADMIN_PROFILE = "ADMIN_PROFILE",
}

interface TabItemProps {
  icon: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  isDisabled?: boolean;
}

const TabItem: React.FC<TabItemProps> = ({ icon, label, isSelected, onClick, isDisabled = false }) => {
  return (
    <div
      className={`tab-item ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
      onClick={!isDisabled ? onClick : undefined}
    >
      <img src={icon} alt="main menu" />
      <div className="label">{label}</div>
    </div>
  );
};

const MainTab: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TABS>(TABS.DASHBOARD);

  return (
    <div className="main-tab-container">

      <TabItem
        icon={Explore}
        label="Dashboard"
        isSelected={selectedTab === TABS.DASHBOARD}
        onClick={() => setSelectedTab(TABS.DASHBOARD)}
      />
      <TabItem

        icon={Dashboard}
        label="Messages"
        isSelected={selectedTab === TABS.MESSAGES}
        onClick={() => setSelectedTab(TABS.MESSAGES)}
        isDisabled={true}
      />
      <TabItem
        icon={Profile}
        label="Admin Profile"
        isSelected={selectedTab === TABS.ADMIN_PROFILE}
        onClick={() => setSelectedTab(TABS.ADMIN_PROFILE)}
        isDisabled={true}
      />
    </div>
  );
};

export default MainTab;
