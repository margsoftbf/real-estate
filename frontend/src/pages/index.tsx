import CustomerOffer from '@/components/features/landing/CustomerOffer';
import Header from '@/components/features/landing/Header';
import Hero from '@/components/features/landing/Hero';
import Newsletter from '@/components/features/landing/Newsletter';
import NewWay from '@/components/features/landing/NewWay';
import Offer from '@/components/features/landing/Offer';
import PopularProperties from '@/components/features/landing/PopularProperties';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Offer />
      <NewWay />
      <PopularProperties />
      <CustomerOffer />
      <Newsletter />
    </div>
  );
}
