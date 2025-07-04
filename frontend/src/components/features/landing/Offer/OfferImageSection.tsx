import Image from 'next/image';
import { VideoVirtualOutline, PropertyInsuranceOutline } from '@/assets/icons';
import offerImage from '@/assets/home-virtual-tour.webp';
import offerImageBg from '@/assets/home-virtual-tour-bg.webp';
import { motion } from 'framer-motion';
import FloatingBadge from './OfferImage/FloatingBadge';

const OfferImageSection = () => {
  return (
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
      <FloatingBadge
        variant="top"
        position="top-4 -left-2"
        icon={<VideoVirtualOutline className="w-5 h-5 text-primary-violet" />}
        title="Virtual home tour"
        subtitle="We provide you with virtual tour"
      />

      <FloatingBadge
        variant="bottom"
        position="-bottom-6 left-1/2 -translate-x-1/2"
        icon={<PropertyInsuranceOutline className="w-5 h-5 text-white" />}
        title="Find the best deal"
        subtitle="Browse thousands of properties"
      />
    </motion.div>
  );
};

export default OfferImageSection;
