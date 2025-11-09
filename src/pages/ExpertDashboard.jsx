// src/pages/ExpertDashboard.jsx
import React, { useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar.jsx";

export default function ExpertDashboard() {
  const [activeKey, setActiveKey] = useState("projectplan");

  const sidebarItems = [
    {
      key: "projectplan",
      label: "Project Plan",
      description: "Milestones with clients",
      onSelect: () => setActiveKey("projectplan"),
    },
    {
      key: "datashare",
      label: "Data Share Point",
      description: "Files to review & deliver",
      onSelect: () => setActiveKey("datashare"),
    },
    {
      key: "reports",
      label: "Reports & Visualisation",
      description: "Outputs you owe",
      onSelect: () => setActiveKey("reports"),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <DashboardSidebar title="Expert Workspace" items={sidebarItems} activeKey={activeKey} />
        <div className="flex-1">
          <div className="text-sm text-gray-500">Expert</div>
          <h1 className="mt-1 text-2xl md:text-3xl font-bold text-primary">Expert Dashboard</h1>
          <p className="mt-6 text-gray-600">
            Sidebar navigation has been preserved while dashboard widgets and placeholder examples
            have been removed as requested.
          </p>
        </div>
      </div>
    </div>
  );
}
