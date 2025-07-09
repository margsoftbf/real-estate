import React from 'react';

interface TabSelectorProps<T extends string> {
  tabs: { key: T; label: string }[];
  activeTab: T;
  onTabChange: (tab: T) => void;
}

const TabSelector = <T extends string>({
  tabs,
  activeTab,
  onTabChange,
}: TabSelectorProps<T>) => {
  return (
    <div className="flex rounded-md gap-2 border-[1.5px] border-purple-200 bg-purple-50/50 p-1.5 overflow-hidden mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`flex-1 py-3 text-center font-semibold transition-all text-sm lg:text-base rounded-md cursor-pointer border-[1.5px] ${
            activeTab === tab.key
              ? 'bg-primary-violet-dark text-white border-purple-200'
              : 'text-gray-500 hover:text-primary-violet border-transparent'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
