import React, { useState } from 'react';

const Tab = ({ tabs, activeTab, setActiveTab }) => {
  const [isMobileView, setIsMobileView] = useState(false);

  const checkSize = () => {
    if (window.innerWidth < 980) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  };

  window.addEventListener('resize', checkSize);

  React.useEffect(() => {
    checkSize();
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, []);

  const tabContainerClasses = isMobileView
    ? 'flex flex-col  max-w-xs'
    : 'flex ';

  return (
    <div className={isMobileView ? 'flex flex-row-reverse' : ''}>
      <div className={`${tabContainerClasses} md:justify-evenly`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${
              activeTab === tab.id
                ? 'bg-primaryButton text-white border-b-0 md:rounded-t-lg'
                : 'text-accent md:rounded-t-lg md:border-b'
            } py-4 px-4 focus:outline-none w-full max-md:text-sm max-md:w-28`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mainCard">
        <div className="bg-white p-4 max-md:min-w-[50vw]">{tabs.find((tab) => tab.id === activeTab).content}</div>
      </div> 
   </div>
  );
};

export default Tab;
