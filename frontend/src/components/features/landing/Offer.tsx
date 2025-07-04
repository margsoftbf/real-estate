import { useState } from 'react';
import { motion } from 'framer-motion';
import OfferImageSection from './Offer/OfferImageSection';
import OfferContentSection from './Offer/OfferContentSection';

type TabKey = 'tenants' | 'landlords';

const Offer = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('tenants');

  return (
    <motion.section
      className="w-full px-4 py-10 bg-white grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto gap-5 items-center mb-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <OfferImageSection />
      <OfferContentSection activeTab={activeTab} onTabChange={setActiveTab} />
    </motion.section>
  );
};

export default Offer;
