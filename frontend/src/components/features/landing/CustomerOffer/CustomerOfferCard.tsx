interface CustomerOfferCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  cardBgColor?: string;
  iconBorderColor?: string;
  iconMainBgColor?: string;
  iconBgColor?: string;
  titleColor?: string;
  descriptionColor?: string;
}

const CustomerOfferCard = ({
  icon,
  title,
  description,
  cardBgColor,
  iconBorderColor,
  iconMainBgColor,
  iconBgColor,
  titleColor,
  descriptionColor,
}: CustomerOfferCardProps) => {
  return (
    <div
      className={`flex flex-col items-start lg:items-start rounded-md p-6  ${cardBgColor}`}
    >
      <div
        className={`rounded-full border w-12 h-12 p-1 flex items-center justify-center ${iconBorderColor} ${iconMainBgColor}`}
      >
        <div
          className={`rounded-full bg-purple-300 w-full h-full flex items-center justify-center ${iconBgColor}`}
        >
          {icon}
        </div>
      </div>
      <h3 className={`text-h4 my-3 ${titleColor}`}>{title}</h3>
      <p className={`text-body-md mt-2 pr-6 ${descriptionColor}`}>
        {description}
      </p>
    </div>
  );
};

export default CustomerOfferCard;
