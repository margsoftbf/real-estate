import Image from 'next/image';
import {
  BedOutline,
  BathOutline,
  AreaIcon,
  HeartOutline,
  StarIconPopular,
} from '@/assets/icons';

export type Property = {
  id: number;
  imageUrl: string;
  popular: boolean;
  price: number;
  name: string;
  address: string;
  beds: number;
  baths: number;
  area: string;
};

type PropertyCardProps = {
  property: Property;
};

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-96 mx-auto cursor-pointer">
      <div className="relative h-48">
        <Image
          src={property.imageUrl}
          alt={property.name}
          fill
          className="object-cover"
        />
        {property.popular && (
          <div className="absolute top-2 left-2 bg-primary-violet text-white border border-primary-violet-dark text-xs font-bold px-3 py-2 rounded-md flex items-center gap-1.5 z-10">
            <StarIconPopular className="w-4 h-4 text-white" />
            POPULAR
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-primary-violet font-semibold text-body-xl">
              ${property.price}
              <span className="text-primary-black opacity-50 text-body-sm font-normal">
                /month
              </span>
            </p>
            <h3 className="text-body-lg font-bold text-gray-900 mt-1">
              {property.name}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-1">
              {property.address}
            </p>
          </div>
          <button className="p-2 rounded-full border border-gray-200 hover:bg-primary-violet hover:cursor-pointer transition-all duration-300 group">
            <HeartOutline className="w-5 h-5 text-primary-violet group-hover:text-white transition-all duration-300" />
          </button>
        </div>
        <div className="flex justify-between items-center gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-1.5 text-gray-600">
            <BedOutline className="w-5 h-5 text-primary-violet" />
            <span className="text-sm">{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <BathOutline className="w-5 h-5 text-primary-violet" />
            <span className="text-sm ">{property.baths} Bathrooms</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <AreaIcon className="w-5 h-5 text-primary-violet" />
            <span className="text-sm">{property.area}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
