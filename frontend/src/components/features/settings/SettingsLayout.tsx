import React, { ReactNode } from 'react';
import Button from '@/components/ui/Button/Button';

interface Tab {
  id: string;
  label: string;
}

interface SettingsLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: Tab[];
  children: ReactNode;
  onSave: () => void;
  isPending: boolean;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  activeTab,
  setActiveTab,
  tabs,
  children,
  onSave,
  isPending,
}) => {
  return (
    <div className="lg:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-h4 text-primary-black font-bold mb-4 px-6 lg:hidden lg:mb-6 mt-4">
          Settings
        </h1>

        <div className="lg:hidden mb-6">
          <div className="flex w-full border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-primary-black border-b-3 border-primary-violet-dark -mb-px'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:flex lg:space-x-8">
          <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-4 py-3 text-sm font-medium text-left transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'text-primary-violet-dark border-l-2 border-primary-violet-dark bg-purple-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 lg:min-w-0 px-4">
            <div className="bg-white border border-purple-300 rounded-md p-6">
              {children}

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={onSave}
                    disabled={isPending}
                    variant="primary"
                    className="w-full"
                  >
                    {isPending ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
