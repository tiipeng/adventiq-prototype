import React from "react";

export default function DashboardSidebar({ title = "Workspace", items = [], activeKey }) {
  return (
    <aside className="bg-white border border-gray-200 rounded-xl shadow-sm w-full lg:w-64 xl:w-72 flex-shrink-0">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-primary">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">Quick navigation</p>
      </div>
      <nav className="py-2">
        {items.map(({ key, label, description, onSelect, disabled }) => {
          const isActive = activeKey === key;
          return (
            <button
              key={key}
              type="button"
              onClick={disabled ? undefined : onSelect}
              className={`w-full text-left px-5 py-3 transition ${
                disabled ? "cursor-not-allowed opacity-60" : "hover:bg-gray-50"
              } ${
                isActive
                  ? "bg-primary/10 border-l-4 border-primary text-primary"
                  : "border-l-4 border-transparent text-gray-700"
              }`}
              aria-current={isActive ? "page" : undefined}
              disabled={disabled}
            >
              <div className="font-medium">{label}</div>
              {description && <div className="text-sm text-gray-500 mt-0.5">{description}</div>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
