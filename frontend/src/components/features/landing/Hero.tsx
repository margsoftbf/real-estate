import { motion } from 'framer-motion';
import Image from 'next/image';
import SearchOutline from '@/assets/icons/SearchOutline';
import heroMapImage from '@/assets/hero-map.png';
import TenantsBold from '@/assets/icons/TenantsBold';
import ApartmentBold from '@/assets/icons/ApartmentBold';
import {
  KeyOutline,
  DotOutlineInsideBold,
  HouseDot,
  LineAToB,
} from '@/assets/icons';
import HeroText from './Hero/HeroText';
import HeroSearchBar from './Hero/HeroSearchBar';
import HeroIcon from './Hero/HeroIcon';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-purple-50 via-purple-50 via-80% lg:via-90% to-white to-95% lg:to-100% overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-0 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col h-full px-6 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-12 sm:pb-20 space-y-8"
          >
            <HeroText />
            <HeroSearchBar className="order-2 lg:order-3 mt-0 lg:mt-8" />
            <div className="flex gap-8 sm:gap-16 pt-4 order-3 lg:order-2">
              <HeroIcon
                mainIcon={<TenantsBold className="w-8 h-8 text-white" />}
                secondaryIcon={<KeyOutline className="w-4 h-4" color="white" />}
                title="50k+ renters"
                description="believe in our service"
              />
              <HeroIcon
                mainIcon={<ApartmentBold className="w-8 h-8 text-white" />}
                secondaryIcon={
                  <SearchOutline className="w-4 h-4" color="white" />
                }
                title="10k+ properties"
                description="ready for occupancy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block relative h-full w-full bottom-6"
          >
            <Image
              src={heroMapImage}
              alt="Property locations map"
              className="absolute inset-0 w-full h-full object-cover rounded-none"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              fill
            />
            <DotOutlineInsideBold className="absolute z-30 right-64 top-20 w-16 h-16" />
            <HouseDot className="absolute z-30 right-56 top-88 w-16 h-24" />
            <LineAToB className="absolute z-20 right-26 top-28 w-48 h-72" />
            <div className="absolute z-10 left-[20%] top-[30%] w-4 h-4 bg-primary-violet rounded-full opacity-80" />
            <div className="absolute z-10 left-[60%] top-[60%] w-3 h-3 bg-primary-violet rounded-full opacity-60" />
            <div className="absolute z-10 left-[15%] bottom-[18%] w-2.5 h-2.5 bg-primary-violet rounded-full opacity-70" />
            <div className="absolute z-30 left-[50%] bottom-[10%] w-4 h-4 bg-primary-violet rounded-full opacity-80 border-2 border-white" />
            <div className="absolute z-30 left-[80%] bottom-[15%] w-3 h-3 bg-primary-violet rounded-full opacity-60 border border-white" />
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background:
                  'linear-gradient(to right, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background:
                  'linear-gradient(to left, #f7f7fd 0%, rgba(247,247,253,0) 20%)',
              }}
            />
            <div className="absolute z-30 left-[40%] top-[50%] w-5 h-5 bg-primary-violet rounded-full opacity-90 border-2 border-white" />
            <div className="absolute z-30 left-[75%] top-[20%] w-2.5 h-2.5 bg-primary-violet rounded-full opacity-70 border border-white" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
