// src/pages/BusinessDashboard.jsx
import React, { useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar.jsx";

export default function BusinessDashboard() {
  const [activeKey, setActiveKey] = useState("projectplan");

  const sidebarItems = [
    {
      key: "projectplan",
      label: "Project Plan",
      description: "Timeline and coordination",
      onSelect: () => setActiveKey("projectplan"),
    },
    {
      key: "datashare",
      label: "Data Share Point",
      description: "Shared assets & briefs",
      onSelect: () => setActiveKey("datashare"),
    },
    {
      key: "reports",
      label: "Reports & Visualisation",
      description: "Consultation outputs",
      onSelect: () => setActiveKey("reports"),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <DashboardSidebar title="Business Workspace" items={sidebarItems} activeKey={activeKey} />
        <div className="flex-1">
          <div className="text-sm text-gray-500">Dashboard</div>
          <h1 className="mt-1 text-2xl md:text-3xl font-bold text-primary">Business Dashboard</h1>
          <p className="mt-6 text-gray-600">
            This dashboard intentionally focuses on sidebar navigation only. Detailed widgets and
            sample content have been removed for the prototype.
          </p>
        </div>
      </div>
    </div>
  );
}
