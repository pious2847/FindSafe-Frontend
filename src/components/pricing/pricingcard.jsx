/* eslint-disable react/prop-types */
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const PricingCard = ({ plan, isPopular, features, price }) => {
  return (
    <div className="w-full md:w-96 p-6 rounded-lg shadow-md  relative">
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan}</h3>
        <p className="text-gray-600">
          <span className="text-4xl font-bold text-red-600 mr-1">${price}</span>
          /month
        </p>
      </div>
      <ul className="space-y-4 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            {feature.included ? (
              <FaCheckCircle className="text-green-500 mr-2" />
            ) : (
              <FaTimesCircle className="text-red-500 mr-2" />
            )}
            {feature.label}
          </li>
        ))}
      </ul>
      <div>
        <Link to={features.find((f) => f.subscribeButtonurl)?.subscribeButtonurl || "#"}>
          <button className="w-full py-3 px-6 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-300">
            Start Trial
          </button>
        </Link>
      </div>
    </div>
  );
};

export default function ThreeTierPricing() {
  const pricingPlans = [
    {
      plan: "Free",
      price: 0,
      features: [
        { label: "Unlimited build minutes", included: true },
        { label: "2 user accounts", included: true },
        { label: "500MB file storage", included: true },
        { label: "Color and UI customization", included: false },
        { subscribeButtonurl: "/free/subscribe" , included: true},
      ],
    },
    {
      plan: "Freemium",
      price: 10,
      isPopular: true,
      features: [
        { label: "Unlimited build minutes", included: true },
        { label: "Unlimited user accounts", included: true },
        { label: "50GB file storage", included: true },
        { label: "Color and UI customization", included: true },
        { subscribeButtonurl: "/freemium/subscribe", included: true },
      ],
    },
    {
      plan: "Premium",
      price: 30,
      features: [
        { label: "Unlimited build minutes", included: true },
        { label: "30 user accounts", included: true },
        { label: "30GB file storage", included: true },
        { label: "Color and UI customization", included: true },
        { subscribeButtonurl: "/premium/subscribe", included: true },
      ],
    },
  ];

  return (
    <div className="py-16 pricetags">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold  mb-4">
            FindSafe Subscription Plans
          </h2>
          <p className="text-lg text-gray-600">
            Start with 14-day free trial. No credit card needed. Cancel at anytime.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan.plan}
              price={plan.price}
              features={plan.features}
              isPopular={plan.isPopular}
            />
          ))}
        </div>
      </div>
    </div>
  );
}