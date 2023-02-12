import { ChatBubbleLeftRightIcon, GiftTopIcon, GlobeAltIcon, ShoppingCartIcon,  } from '@heroicons/react/24/outline';


const incentives = [
  {
    name: 'Free Exchanges & Returns',
    description: "Fast, easy, and free worldwide shipping on all exchanges and returns. No matter what.",
    icon: <GlobeAltIcon />,
  },
  {
    name: '24/7 Customer Support',
    description: 'Have a question or concern? Our customer care team is here to help around the clock.',
    icon: <ChatBubbleLeftRightIcon />,
  },
  {
    name: 'Satisfaction Guarantee',
    description: "We are proud to offer the highest quality products. If you don't love it, you can return your order for a full refund.",
    icon: <ShoppingCartIcon />,
  },
  {
    name: 'Gift Cards',
    description: "Looking for the perfect gift? Reward them with something they'll love. ",
    icon: <GiftTopIcon />,
  },
]



const Incentives = (props) => {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 mx-auto">
          {incentives.map((incentive) => (
            <div key={incentive.name}>
              <h1 className='h-12 w-12 text-green'>{incentive.icon}</h1>
              <h3 className="mt-6 text-sm font-medium text-dark-blue">{incentive.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{incentive.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Incentives;