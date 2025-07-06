import { motion } from 'framer-motion';
import Image from 'next/image';
import { HomeIllustration } from '@/assets/icons';
import dailyCompleted from '@/assets/icons-picture/daily-completed.png';
import propertySell from '@/assets/icons-picture/property-sell.png';
import propertyReturn from '@/assets/icons-picture/property-return.png';
import NewWayHeader from './NewWay/NewWayHeader';

const stats = [
  {
    icon: propertyReturn,
    value: '7.4%',
    label: 'Property Return Rate',
  },
  {
    icon: propertySell,
    value: '3,856',
    label: 'Property in Sell & Rent',
  },
  {
    icon: dailyCompleted,
    value: '2,540',
    label: 'Daily Completed Transactions',
  },
];

const NewWay = () => {
  return (
    <section className="px-4 py-10">
      <motion.div
        className="max-w-7xl mx-auto bg-purple-50 rounded-2xl p-8 sm:p-8 lg:p-2 border border-purple-300 shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="flex flex-col gap-6 lg:gap-10 order-1 lg:px-12">
            <NewWayHeader />
            <div className="w-fit mx-auto lg:w-full lg:mx-0">
              <div className="flex flex-col lg:flex-row lg:justify-between gap-y-8 lg:gap-x-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center lg:flex-col lg:justify-center lg:text-center gap-4"
                  >
                    <Image
                      src={stat.icon}
                      alt={stat.label}
                      width={64}
                      height={64}
                    />
                    <div>
                      <p className="font-bold text-2xl text-secondary-violet">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-2 flex justify-center lg:justify-end items-center -mx-8 -mb-8 lg:mb-0">
            <HomeIllustration className="w-full max-w-xl h-auto lg:-mr-4" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default NewWay;
