import { motion } from 'framer-motion';
import {
  Search,
  Home,
  TrendingUp,
  Shield,
  MapPin,
  Calendar,
  Users,
} from 'lucide-react';
import Header from '@/components/Header';
import Button from '@/components/common/Button';
import Link from 'next/link';

const stats = [
  { id: 1, name: 'Properties Listed', value: '50,000+' },
  { id: 2, name: 'Happy Customers', value: '25,000+' },
  { id: 3, name: 'Cities Covered', value: '100+' },
  { id: 4, name: 'Years Experience', value: '15+' },
];

const features = [
  {
    icon: Search,
    title: 'Smart Search',
    description:
      'Find your perfect property with our AI-powered search engine and advanced filters.',
  },
  {
    icon: MapPin,
    title: 'Prime Locations',
    description:
      'Discover properties in the most sought-after neighborhoods and emerging areas.',
  },
  {
    icon: TrendingUp,
    title: 'Market Insights',
    description:
      'Get real-time market data and trends to make informed investment decisions.',
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    description:
      'Complete your property transactions with confidence using our secure platform.',
  },
  {
    icon: Calendar,
    title: 'Virtual Tours',
    description:
      'Take 360° virtual tours of properties from the comfort of your home.',
  },
  {
    icon: Users,
    title: 'Expert Support',
    description:
      'Get personalized assistance from our team of real estate professionals.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Dream Home
                </span>
                Today
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl">
                Discover the perfect property with our comprehensive real estate
                platform. From luxury apartments to family homes, we have
                something for everyone.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/properties">
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex items-center space-x-2"
                  >
                    <Search className="w-5 h-5" />
                    <span>Browse Properties</span>
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex items-center space-x-2"
                  >
                    <Users className="w-5 h-5" />
                    <span>Contact Agent</span>
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto lg:max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Quick Property Search
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Enter city or neighborhood"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Type
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>House</option>
                        <option>Apartment</option>
                        <option>Condo</option>
                        <option>Townhouse</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Range
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Any Price</option>
                        <option>$0 - $500k</option>
                        <option>$500k - $1M</option>
                        <option>$1M+</option>
                      </select>
                    </div>
                  </div>

                  <Button variant="primary" size="md" className="w-full">
                    Search Properties
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-gray-600">
                  {stat.name}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive tools and services to make your real
              estate journey seamless and successful.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who found their perfect home
              through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center space-x-2"
              >
                <Home className="w-5 h-5" />
                <span>Get Started Free</span>
              </Link>
              <Link
                href="/properties"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 inline-flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Browse Properties</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Button Demo Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Button Component Demo
            </h2>
            <p className="text-xl text-gray-600">
              Różne warianty i rozmiary naszego reużywalnego komponentu Button
            </p>
          </div>

          <div className="space-y-12">
            {/* Primary Buttons */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Primary Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="sm">
                  Small Primary
                </Button>
                <Button variant="primary" size="md">
                  Medium Primary
                </Button>
                <Button variant="primary" size="lg">
                  Large Primary
                </Button>
              </div>
            </div>

            {/* Outline Buttons */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Outline Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="sm">
                  Small Outline
                </Button>
                <Button variant="outline" size="md">
                  Medium Outline
                </Button>
                <Button variant="outline" size="lg">
                  Large Outline
                </Button>
              </div>
            </div>

            {/* Disabled State */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Disabled State</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="md" disabled>
                  Disabled Primary
                </Button>
                <Button variant="outline" size="md" disabled>
                  Disabled Outline
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
