import React, { useState } from "react";
import "./sideBar.css";
import { StarBorderOutlined, DashboardOutlined, CalendarMonthOutlined, ScheduleSendOutlined, DocumentScanner, PersonAddAlt, AirplaneTicketOutlined, WorkspacePremiumOutlined } from '@mui/icons-material';

enum TABS {
  ONBOARDING = "ONBOARDING",
  DASHBOARD = "DASHBOARD",
  CALENDAR = "CALENDAR",
  SCHEDULE = "SCHEDULE",
  CLIENTS = "CLIENTS",
  DOCUMENTS = "DOCUMENTS"
}

interface TabItemProps {
  icon: React.ReactNode;
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
      {icon}
      <div className="label">{label}</div>
    </div>
  );
};

const MainTab: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TABS>(TABS.DASHBOARD);

  return (
    <div className="main-container">
      <div className="main-tab-inner-container">

        <TabItem
          icon={<DashboardOutlined />}
          label="Dashboard"
          isSelected={selectedTab === TABS.DASHBOARD}
          onClick={() => setSelectedTab(TABS.DASHBOARD)}
        />
        <TabItem
          icon={<AirplaneTicketOutlined />}
          label="Onboarding"
          isSelected={selectedTab === TABS.ONBOARDING}
          onClick={() => setSelectedTab(TABS.ONBOARDING)}
          isDisabled={true}
        />
        <TabItem
          icon={<CalendarMonthOutlined />}
          label="Calendar"
          isSelected={selectedTab === TABS.CALENDAR}
          onClick={() => setSelectedTab(TABS.CALENDAR)}
          isDisabled={true}
        />
        <TabItem
          icon={<ScheduleSendOutlined />}
          label="Schedule"
          isSelected={selectedTab === TABS.SCHEDULE}
          onClick={() => setSelectedTab(TABS.SCHEDULE)}
          isDisabled={true}
        />
        <TabItem
          icon={<PersonAddAlt />}
          label="Clients"
          isSelected={selectedTab === TABS.CLIENTS}
          onClick={() => setSelectedTab(TABS.CLIENTS)}
          isDisabled={true}
        />
        <TabItem
          icon={<DocumentScanner />}
          label="Documents"
          isSelected={selectedTab === TABS.DOCUMENTS}
          onClick={() => setSelectedTab(TABS.DOCUMENTS)}
          isDisabled={true}
        />


      </div>
      <div className="premium-container">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

          <WorkspacePremiumOutlined fontSize="large" />
          <div className="premium-label">Efficient Employee Management</div>

        </div>
        <div
          className={`premium-button`}
        >
          <div className="label">Upgrade to Premium</div>
          <StarBorderOutlined />
        </div>
      </div>
    </div>
  );
};

export default MainTab;
