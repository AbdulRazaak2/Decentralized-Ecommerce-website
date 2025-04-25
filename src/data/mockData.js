export const mockProducts = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and immersive sound quality.',
    price: 0.05, // BNB
    image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Electronics',
    stock: 15,
    createdAt: '2023-08-15T10:30:00Z',
    seller: {
      address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      name: 'TechGadgets',
      rating: 4.8
    },
    reviews: [
      {
        id: '101',
        user: '0xb0b16607a8c0b3eebe82f8d8cc9d417442dc9a9c',
        username: 'AudioPhile',
        rating: 5,
        comment: 'Incredible sound quality and the noise cancellation is top-notch!',
        date: '2023-09-01T14:22:00Z'
      },
      {
        id: '102',
        user: '0x1a75bbc34642a7514d59de47f06ffcc094125bbb',
        username: 'MusicLover',
        rating: 4,
        comment: 'Great headphones but the ear cushions could be more comfortable for extended use.',
        date: '2023-08-25T09:15:00Z'
      }
    ],
    averageRating: 4.5
  },
  {
    id: '2',
    name: 'Smart Home Hub',
    description: 'Central control for your smart home devices. Compatible with over 100 smart home products and voice assistants.',
    price: 0.03, // BNB
    image: 'https://images.pexels.com/photos/1034812/pexels-photo-1034812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Smart Home',
    stock: 8,
    createdAt: '2023-08-10T15:45:00Z',
    seller: {
      address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      name: 'SmartLife',
      rating: 4.6
    },
    reviews: [
      {
        id: '201',
        user: '0x3c567a7ca36eda85a19f2ca8a32a53911f57e8a1',
        username: 'TechEnthusiast',
        rating: 5,
        comment: 'Perfect central hub for all my smart devices. Easy setup and intuitive app!',
        date: '2023-08-30T11:10:00Z'
      }
    ],
    averageRating: 5
  },
  {
    id: '3',
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with customizable switches. Perfect for gaming and professional typing.',
    price: 0.02, // BNB
    image: 'https://images.pexels.com/photos/4584532/pexels-photo-4584532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Computer Accessories',
    stock: 20,
    createdAt: '2023-08-05T09:15:00Z',
    seller: {
      address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      name: 'GamersChoice',
      rating: 4.7
    },
    reviews: [
      {
        id: '301',
        user: '0x7e384b7ccfdc8e96fb8b137e398a981f0d2b4a6e',
        username: 'ProGamer',
        rating: 5,
        comment: 'The tactile feedback is amazing! Love the customizable RGB options too.',
        date: '2023-08-20T16:45:00Z'
      },
      {
        id: '302',
        user: '0x9d8a62f656e3a91a0d0f1aae4b5c7ebe4769c498',
        username: 'CodeNinja',
        rating: 4,
        comment: 'Great for coding all day. Keys have nice travel and tactile bump.',
        date: '2023-08-15T13:20:00Z'
      }
    ],
    averageRating: 4.5
  },
  {
    id: '4',
    name: 'Virtual Reality Headset',
    description: 'Immersive VR experience with high-resolution displays, built-in speakers, and precise motion tracking.',
    price: 0.08, // BNB
    image: 'https://images.pexels.com/photos/3761823/pexels-photo-3761823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Electronics',
    stock: 5,
    createdAt: '2023-07-28T14:00:00Z',
    seller: {
      address: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
      name: 'VRWorld',
      rating: 4.9
    },
    reviews: [
      {
        id: '401',
        user: '0x4b5f3ad2e610f05ad55f461ca38752a0badb0e8c',
        username: 'VREnthusiast',
        rating: 5,
        comment: 'Mind-blowing experience! The tracking is flawless and the resolution is stunning.',
        date: '2023-08-10T10:30:00Z'
      }
    ],
    averageRating: 5
  },
  {
    id: '5',
    name: 'Smart Watch',
    description: 'Track your fitness, receive notifications, and monitor your health with this sleek smartwatch.',
    price: 0.015, // BNB
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Wearables',
    stock: 25,
    createdAt: '2023-08-01T11:20:00Z',
    seller: {
      address: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
      name: 'TimeWear',
      rating: 4.5
    },
    reviews: [
      {
        id: '501',
        user: '0x2d7e5c1d8d3c13b5ec72f4ef3e1f2a4e1b228f6b',
        username: 'FitnessFreak',
        rating: 4,
        comment: 'Great fitness tracking features and battery life is impressive!',
        date: '2023-08-22T08:15:00Z'
      },
      {
        id: '502',
        user: '0x8c3d14d18d56e1d5b4a53e353603ed6c02b10574',
        username: 'TechReviewer',
        rating: 5,
        comment: 'The best smartwatch I\'ve used. Health metrics are surprisingly accurate!',
        date: '2023-08-18T17:40:00Z'
      }
    ],
    averageRating: 4.5
  }
]

export const categories = [
  'Electronics',
  'Smart Home',
  'Computer Accessories',
  'Wearables',
  'Fashion',
  'Collectibles',
  'Digital Art',
  'Gaming'
]