import Header from '@/components/features/landing/Header';
import Hero from '@/components/features/landing/Hero';
import NewWay from '@/components/features/landing/NewWay';
import Offer from '@/components/features/landing/Offer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Offer />
      <NewWay />
    </div>
  );
}
