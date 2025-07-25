import React from 'react';
import Sidebar from '../components/Sidebar';
import { Search } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Product arrays
const featuredProducts = [
  { name: 'Fresh Onions', price: '₹25/kg', image: 'https://plus.unsplash.com/premium_photo-1723708958105-09e29205e551?q=80&w=1144&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Ripe Tomatoes', price: '₹30/kg', image: 'https://plus.unsplash.com/premium_photo-1723874531848-a1e5786e096d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJpcGUlMjB0b21hdG98ZW58MHx8MHx8fDA%3D' },
  { name: 'Garlic Bulbs', price: '₹150/kg', image: 'https://plus.unsplash.com/premium_photo-1675864033916-88ba6dde849f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybGljJTIwYnVsYnN8ZW58MHx8MHx8fDA%3D' },
  { name: 'Ginger Root', price: '₹100/kg', image: 'https://images.unsplash.com/photo-1635008388183-04ea0313c5d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2luZ2VyJTIwcm9vdHxlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Potatoes', price: '₹20/kg', image: 'https://images.unsplash.com/photo-1635774855536-9728f2610245?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG90YXRvZXN8ZW58MHx8MHx8fDA%3D' },
];

const vegetables = [
  { name: 'Green Peppers', price: '₹40/kg', image: 'https://images.unsplash.com/photo-1585159079680-8dec029b76ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBwZXBwZXJzfGVufDB8fDB8fHww' },
  { name: 'Carrots', price: '₹35/kg', image: 'https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2Fycm90c3xlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Cauliflower', price: '₹28/kg', image: 'https://media.istockphoto.com/id/182240577/photo/bin-of-cauliflower-heads.webp?a=1&b=1&s=612x612&w=0&k=20&c=LsO82lZblJqimkOLmrcHpaAa2QgNgKbZ-UfTAcpzAdQ=' },
  { name: 'Spinach', price: '₹15/bunch', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Cabbage', price: '₹18/kg', image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FiYmFnZXxlbnwwfHwwfHx8MA%3D%3D' },
];

const spices = [
  { name: 'Cumin Seeds', price: '₹200/kg', image: 'https://plus.unsplash.com/premium_photo-1722686499744-59e1bcf902a6?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Turmeric Powder', price: '₹180/kg', image: 'https://plus.unsplash.com/premium_photo-1723867311354-e170658fd619?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHVybWVyaWN8ZW58MHx8MHx8fDA%3D' },
  { name: 'Red Chili Powder', price: '₹220/kg', image: 'https://images.unsplash.com/photo-1702041295471-01b73fd39907?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVkJTIwY2hpbGxpJTIwcG93ZGVyfGVufDB8fDB8fHww' },
  { name: 'Coriander Seeds', price: '₹160/kg', image: 'https://images.unsplash.com/photo-1508748169069-82590c9f26e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29yaWFuZGVyJTIwc2VlZHN8ZW58MHx8MHx8fDA%3D' },
  { name: 'Black Pepper', price: '₹500/kg', image: 'https://plus.unsplash.com/premium_photo-1726072357017-0af7b90a463d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

export default function Home() {
  return (
    
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="relative w-full  mx-auto">
        <input
            type="text"
            placeholder="Search raw materials..."
            className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black hover:text-green-500 cursor-pointer">
                <Search size={24}/>
        </span>
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
