import Image from 'next/image';
import Link from 'next/link';
import {
  BedOutline,
  BathOutline,
  AreaIcon,
  HeartOutline,
  StarIconPopular,
} from '@/assets/icons';
import { PropertyPublicDto } from '@/types/properties';

type PropertyCardProps = {
  property: PropertyPublicDto;
};

const PropertyCard = ({ property }: PropertyCardProps) => {
  const firstPhoto = property.photos?.[0] || '/placeholder-property.jpg';
  const priceText = property.type === 'rent' ? '/month' : '';
  const bedrooms = property.features?.bedrooms || 0;
  const bathrooms = property.features?.bathrooms || 0;
  const area = property.features?.area ? `${property.features.area} m²` : 'N/A';

  return (
    <Link href={`/properties/${property.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-96 mx-auto cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary-violet-dark border border-transparent">
        <div className="relative h-48">
          <Image
            src={firstPhoto}
            alt={property.title || 'Property'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute w-full h-full bg-gradient-to-b from-black/30 to-transparent"></div>
          {property.isPopular && (
            <div className="absolute top-2 left-2 bg-primary-violet-dark text-white border border-primary-violet-dark text-xs font-bold px-3 py-2 rounded-md flex items-center gap-1.5 z-10">
              <StarIconPopular className="w-4 h-4 text-white" />
              POPULAR
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-primary-violet-dark text-body-xl font-bold flex items-center gap-1">
                ${Math.floor(property.price).toLocaleString()}
                <span className="text-primary-black opacity-70 text-body-sm font-normal">
                  {priceText}
                </span>
              </p>
              <h3 className="text-body-lg font-bold text-gray-900 mt-1 line-clamp-1 mb-2">
                {property.title || 'Untitled Property'}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-1">
                {property.city}, {property.country}
              </p>
            </div>
            <button className="p-2 rounded-full border border-gray-200 hover:bg-primary-violet hover:cursor-pointer transition-all duration-300 group">
              <HeartOutline
                className="w-5 h-5 text-primary-violet group-hover:text-white transition-all duration-300"
                aria-label="Add to favorites"
              />
            </button>
          </div>
          <div className="flex justify-between items-center gap-4 mt-2 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-1.5 text-gray-600">
              <BedOutline className="w-5 h-5 text-primary-violet" />
              <span className="text-sm">{bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <BathOutline className="w-5 h-5 text-primary-violet" />
              <span className="text-sm">{bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <AreaIcon className="w-5 h-5 text-primary-violet" />
              <span className="text-sm">{area}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
