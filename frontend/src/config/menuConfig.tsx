import {
  DashboardBold,
  DocumentOutline,
  HeartOutline,
  InsightOutline,
  MessageOutline,
  PropertiesOutline,
  QuestionMarkOutline,
  RentPaymentOutline,
  SettingOutline,
  TenantsOutline,
} from '@/assets/icons';

export const menu = {
  landlord: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: <DashboardBold className="w-5 h-5" />,
    },
    {
      title: 'Insight',
      url: '/insight',
      icon: <InsightOutline className="w-5 h-5" />,
    },
    {
      title: 'My Listings',
      url: '/listings',
      icon: <PropertiesOutline className="w-5 h-5" />,
    },
    {
      title: 'Tenants',
      url: '/tenants',
      icon: <TenantsOutline className="w-5 h-5" />,
    },
    {
      title: 'Rent Payment',
      url: '/payments',
      icon: <RentPaymentOutline className="w-5 h-5" />,
    },
    {
      title: 'Messages',
      url: '/messages',
      icon: <MessageOutline className="w-5 h-5" />,
    },
  ],
  tenant: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: <DashboardBold className="w-5 h-5" />,
    },
    {
      title: 'Tenancy Applications',
      url: '/tenancy-applications',
      icon: <DocumentOutline className="w-5 h-5" />,
    },
    {
      title: 'Favorited',
      url: '/payments',
      icon: <HeartOutline className="w-5 h-5" />,
    },
  ],
  admin: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: <DashboardBold className="w-5 h-5" />,
    },
    {
      title: 'Users',
      url: '/users',
      icon: <TenantsOutline className="w-5 h-5" />,
    },
  ],
};

export const commonMenuItems = [
  {
    title: 'Help',
    url: '/help',
    icon: <QuestionMarkOutline className="w-5 h-5" />,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: <SettingOutline className="w-5 h-5" />,
  },
];