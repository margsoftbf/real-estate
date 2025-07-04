import Header from '@/components/features/landing/Header';
import Hero from '@/components/features/landing/Hero';
import Offer from '@/components/features/landing/Offer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Offer />
    </div>
  );
}
