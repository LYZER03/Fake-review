import React from 'react';
import Link from 'next/link'

const SubscriptionLevel = ({ title, description, features, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-500 mb-4">{description}</p>
        <ul className="list-disc pl-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <div className="mt-6">
          <p className="text-2xl font-bold">{price}</p>
            <button className="btn btn-neutral">
              <Link href="">Suscribe now</Link>
            </button>
        </div>
      </div>
    </div>
  );
};

export default function Page() {

  const subscriptionLevels = [
    {
      title: 'DEEP +',
      description: 'I just need the basics!',
      features: [
        'Ad-free',
        '10 Credits',
      ],
      price: '$0.99 USD/Month'
    },
    {
      title: 'DEEP Gold',
      description: 'Full access to all premium features.',
      features: [
        'Ad-free',
        '100 Credits',
        'Exclusive access to resources on fake review detection',
      ],
      price: '$8.99 USD/Month'
    },
    {
      title: 'DEEP Platinum',
      description: 'Ultimate access with exclusive perks.',
      features: [
        'Ad-free',
        'Unlimited Credits',
        'Exclusive access to resources on fake review detection',
        'Early access to new fake review detection features',
        'Special profile badges for commitment to fighting fake reviews',
      ],
      price: '$24.99 USD/Month'
    }
  ];

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold mb-6">Subscription Levels</h1>
      <h2 className="text-xl font-bold mb-6">Upgrade to Plus, Gold or Platinum for a better experience.</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subscriptionLevels.map((level, index) => (
          <SubscriptionLevel key={index} {...level} />
        ))}
      </div>
    </div>
  );
}


