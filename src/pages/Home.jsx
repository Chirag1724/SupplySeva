import React from 'react';
import Sidebar from '../components/Sidebar';

// Product arrays
const featuredProducts = [
  { name: 'Fresh Onions', price: '₹25/kg', image: '/images/onion.jpg' },
  { name: 'Ripe Tomatoes', price: '₹30/kg', image: '/images/tomato.jpg' },
  { name: 'Garlic Bulbs', price: '₹150/kg', image: '/images/garlic.jpg' },
  { name: 'Ginger Root', price: '₹100/kg', image: '/images/ginger.jpg' },
  { name: 'Potatoes', price: '₹20/kg', image: '/images/potato.jpg' },
];

const vegetables = [
  { name: 'Green Peppers', price: '₹40/kg', image: '/images/pepper.jpg' },
  { name: 'Carrots', price: '₹35/kg', image: '/images/carrot.jpg' },
  { name: 'Cauliflower', price: '₹28/kg', image: '/images/cauliflower.jpg' },
  { name: 'Spinach', price: '₹15/bunch', image: '/images/spinach.jpg' },
  { name: 'Cabbage', price: '₹18/kg', image: '/images/cabbage.jpg' },
];

const spices = [
  { name: 'Cumin Seeds', price: '₹200/kg', image: '/images/cumin.jpg' },
  { name: 'Turmeric Powder', price: '₹180/kg', image: '/images/turmeric.jpg' },
  { name: 'Red Chili Powder', price: '₹220/kg', image: '/images/chili.jpg' },
  { name: 'Coriander Seeds', price: '₹160/kg', image: '/images/coriander.jpg' },
  { name: 'Black Pepper', price: '₹500/kg', image: '/images/blackpepper.jpg' },
];

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search raw materials..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Featured Products */}
        <Section title="Featured Products" products={featuredProducts} />

        {/* Vegetables */}
        <Section title="Vegetables" products={vegetables} />

        {/* Spices */}
        <Section title="Spices" products={spices} />
      </main>
    </div>
  );
}

function Section({ title, products }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((item, idx) => (
          <ProductCard key={idx} {...item} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ name, price, image }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 text-center">
      <img src={image} alt={name} className="h-24 w-full object-cover rounded-md mb-2" />
      <h3 className="text-sm font-medium">{name}</h3>
      <p className="text-sm text-gray-500">{price}</p>
    </div>
  );
}
