import { motion } from 'framer-motion';
import TabSelector from './OfferContent/TabSelector';
import TabContent from './OfferContent/TabContent';

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

interface OfferContentSectionProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const OfferContentSection = ({
  activeTab,
  onTabChange,
}: OfferContentSectionProps) => {
  return (
    <motion.div
      className="w-full max-w-lg lg:max-w-lg mx-auto mt-8 lg:mt-0"
      initial={{ opacity: 0, x: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
    >
      <TabSelector
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      <TabContent content={tabContent[activeTab]} />
    </motion.div>
  );
};

export default OfferContentSection;
