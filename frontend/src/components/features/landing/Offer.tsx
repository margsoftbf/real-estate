import { useState } from 'react';
import Image from 'next/image';
import { VideoVirtualOutline, PropertyInsuranceOutline } from '@/assets/icons';
import offerImage from '@/assets/home-virtual-tour.webp';
import offerImageBg from '@/assets/home-virtual-tour-bg.webp';
import { motion } from 'framer-motion';

type TabKey = 'tenants' | 'landlords';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'tenants', label: 'For tenants' },
  { key: 'landlords', label: 'For landlords' },
];

const tabContent: Record<
  TabKey,
  { title: string; description: string; button: string }
> = {
  tenants: {
    title: 'We make it easy for tenants and landlords.',
    description:
      'Whether it is selling your current home, getting financing, or buying a new home, we make it easy and efficient. The best part? You will save a bunch of money and time with our services.',
    button: 'See more',
  },
  landlords: {
    title: 'Landlords: List your property with ease',
    description:
      'Reach thousands of verified tenants, manage your offers easily, and enjoy modern tools for property management. Start earning more with less hassle!',
    button: 'Add your property',
  },
};

const Offer = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('tenants');

  const currentContent = tabContent[activeTab];

  return (
    <motion.section
      className="w-full px-4 py-10 bg-white grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto gap-5 items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <motion.div
        className="w-full max-w-lg lg:max-w-none mx-auto lg:mx-0 relative mb-4 lg:mb-0"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <Image
          src={offerImage}
          alt="House offer"
          className="w-full h-80 lg:h-[420px] block md:hidden rounded-md"
          style={{ objectFit: 'cover' }}
          priority
        />
        <Image
          src={offerImageBg}
          alt="House offer background"
          className="w-full lg:h-[520px] hidden md:block rounded-md"
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute top-4 -left-2 z-20 bg-white rounded-md shadow-md shadow-primary-violet/40 px-4 py-3 flex items-center gap-2">
          <span className="bg-primary-violet/10 p-2 rounded-full border-purple-300 border-2">
            <VideoVirtualOutline className="w-5 h-5 text-primary-violet" />
          </span>
          <div>
            <div className="font-semibold text-sm text-secondary-violet">
              Virtual home tour
            </div>
            <div className="text-xs text-gray-500">
              We provide you with virtual tour
            </div>
          </div>
        </div>
        <div className="w-72 absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-2 border-2 border-purple-50">
          <span className=" p-2 rounded-full border-purple-300 border-2 absolute -top-5 right-5 z-20 bg-primary-violet">
            <PropertyInsuranceOutline className="w-5 h-5 text-white" />
          </span>
          <div>
            <div className="font-semibold text-sm text-secondary-violet">
              Find the best deal
            </div>
            <div className="text-xs text-gray-500">
              Browse thousands of properties
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="w-full max-w-lg lg:max-w-lg mx-auto mt-8 lg:mt-0"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
      >
        <div className="flex rounded-md gap-2 border-[1.5px] border-purple-200 bg-purple-50/50 p-1.5 overflow-hidden mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 text-center font-semibold transition-all text-sm lg:text-base rounded-md cursor-pointer border-[1.5px] ${
                activeTab === tab.key
                  ? 'bg-white text-primary-violet border-purple-200'
                  : 'text-gray-500 hover:text-primary-violet border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-center lg:text-left">
          <h2 className="text-h3 font-bold text-primary-black mb-2 lg:text-4xl">
            {currentContent.title}
          </h2>
          <p className="text-gray-500 mb-6 text-sm lg:text-lg">
            {currentContent.description}
          </p>
          <button className="w-full bg-primary-violet text-white font-semibold py-3 rounded-lg transition hover:bg-primary-violet/90 md:w-auto md:px-8">
            {currentContent.button}
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Offer;
