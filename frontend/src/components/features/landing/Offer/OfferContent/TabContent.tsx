import React from 'react';

interface TabContentProps {
  content: {
    title: string;
    description: string;
    button: string;
  };
}

const TabContent = ({ content }: TabContentProps) => {
  return (
    <div className="text-center lg:text-left lg:mt-8">
      <h2 className="text-h3 font-bold text-primary-black mb-2 lg:text-4xl">
        {content.title}
      </h2>
      <p className="text-gray-500 mb-6 text-sm lg:text-lg lg:py-3">
        {content.description}
      </p>
      <button className="w-full bg-primary-violet-dark text-white font-semibold py-3 rounded-lg transition hover:bg-primary-violet/90 md:w-auto md:px-8 cursor-pointer">
        {content.button}
      </button>
    </div>
  );
};

export default TabContent;
