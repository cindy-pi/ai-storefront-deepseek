import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function Home() {
  return (
    <main className="page">
      <h1>Welcome to Fizban's Wands</h1>
      <p>Discover enchanted wands for every wizard and sorcerer.</p>
    </main>
  );
}

function Catalog() {
  return (
    <main className="page">
      <h1>Wand Catalog</h1>
      <p>Browse our collection of finely crafted wands.</p>
    </main>
  );
}

function Cart() {
  return (
    <main className="page">
      <h1>Shopping Cart</h1>
      <p>Your selected wands appear here.</p>
    </main>
  );
}

function Checkout() {
  return (
    <main className="page">
      <h1>Checkout</h1>
      <p>Complete your purchase.</p>
    </main>
  );
}

function Confirmation() {
  return (
    <main className="page">
      <h1>Order Confirmed</h1>
      <p>Thank you for your purchase! Your wand will be dispatched shortly.</p>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </>
  );
}
