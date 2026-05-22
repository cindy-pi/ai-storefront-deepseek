import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useShop } from './context/ShopContext';
import Navbar from './components/Navbar';
import wands, { alignments } from './data/wands';

function Home() {
  const { addToCart } = useShop();
  const featured = wands.filter(w => [1, 14, 27].includes(w.id));
  return (
    <main className="page">
      <section className="hero">
        <h1>Welcome to Fizban's Wands</h1>
        <p className="hero-subtitle">Discover enchanted wands for every wizard and sorcerer.</p>
        <Link to="/catalog" className="btn btn-gold">Browse the Catalog</Link>
      </section>

      <section className="featured-section">
        <h2>Featured Wands</h2>
        <div className="featured-grid">
          {featured.map(wand => (
            <div key={wand.id} className={`wand-card wand-${wand.alignment.toLowerCase()}`}>
              <div className="wand-visual">{wand.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
              <h3>{wand.name}</h3>
              <span className="wand-alignment">{wand.alignment}</span>
              <span className="wand-price">{wand.price} gp</span>
              <p className="wand-desc">{wand.description}</p>
              <button className="btn btn-sm" onClick={() => addToCart(wand)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Catalog() {
  const { addToCart } = useShop();
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = filter === 'All' ? wands : wands.filter(w => w.alignment === filter);

  return (
    <main className="page">
      <h1>Wand Catalog</h1>
      <p className="page-subtitle">Browse our collection of {wands.length} finely crafted wands.</p>

      <div className="filter-bar">
        <button className={`btn btn-filter ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
        {alignments.map(a => (
          <button key={a} className={`btn btn-filter ${filter === a ? 'active' : ''}`} onClick={() => setFilter(a)}>{a}</button>
        ))}
      </div>

      <div className="catalog-grid">
        {filtered.map(wand => (
          <div key={wand.id} className={`wand-card wand-${wand.alignment.toLowerCase()}`} onClick={() => setSelected(wand)}>
            <div className="wand-visual">{wand.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
            <h3>{wand.name}</h3>
            <span className="wand-alignment">{wand.alignment}</span>
            <span className="wand-price">{wand.price} gp</span>
            <button className="btn btn-sm" onClick={(e) => { e.stopPropagation(); addToCart(wand); }}>Add to Cart</button>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>&times;</button>
            <div className={`wand-visual wand-visual-lg wand-${selected.alignment.toLowerCase()}`}>
              {selected.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </div>
            <h2>{selected.name}</h2>
            <span className="wand-alignment">{selected.alignment}</span>
            <span className="wand-price">{selected.price} gp</span>
            <p className="wand-desc">{selected.description}</p>
            <button className="btn btn-gold" onClick={() => { addToCart(selected); setSelected(null); }}>Add to Cart</button>
          </div>
        </div>
      )}
    </main>
  );
}

function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, goldBalance } = useShop();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <main className="page">
        <h1>Shopping Cart</h1>
        <p className="empty-state">Your cart is empty. Browse the catalog to add wands.</p>
        <Link to="/catalog" className="btn btn-gold">Go to Catalog</Link>
      </main>
    );
  }

  return (
    <main className="page">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className={`wand-visual wand-sm wand-${item.alignment.toLowerCase()}`}>
              {item.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </div>
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <span className="wand-alignment">{item.alignment}</span>
              <span className="wand-price">{item.price} gp each</span>
            </div>
            <div className="cart-item-qty">
              <button className="btn btn-sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button className="btn btn-sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <div className="cart-item-total">{item.price * item.quantity} gp</div>
            <button className="btn btn-sm btn-remove" onClick={() => removeFromCart(item.id)}>&times;</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary-row"><span>Subtotal</span><span>{cartTotal} gp</span></div>
        <div className="cart-summary-row"><span>Your Balance</span><span>{goldBalance} gp</span></div>
        <div className="cart-summary-row cart-summary-total">
          <span>Remaining After Purchase</span>
          <span className={goldBalance - cartTotal < 0 ? 'text-danger' : ''}>{goldBalance - cartTotal} gp</span>
        </div>
        {cartTotal > goldBalance && (
          <p className="text-danger">Insufficient gold! Remove some items to continue.</p>
        )}
        <button
          className="btn btn-gold"
          disabled={cartTotal > goldBalance}
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      </div>
    </main>
  );
}

function Checkout() {
  const { cart, cartTotal, goldBalance, checkout } = useShop();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <main className="page">
        <h1>Checkout</h1>
        <p className="empty-state">Nothing to check out.</p>
        <Link to="/catalog" className="btn btn-gold">Browse Wands</Link>
      </main>
    );
  }

  const handlePurchase = () => {
    const order = checkout();
    if (order) {
      navigate(`/confirmation?order=${order.id}`);
    }
  };

  return (
    <main className="page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <div className="checkout-items">
          <h2>Order Summary</h2>
          {cart.map(item => (
            <div key={item.id} className="checkout-item">
              <div className={`wand-visual wand-sm wand-${item.alignment.toLowerCase()}`}>
                {item.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div className="checkout-item-info">
                <span>{item.name} x{item.quantity}</span>
                <span className="wand-price">{item.price * item.quantity} gp</span>
              </div>
            </div>
          ))}
        </div>

        <div className="checkout-summary">
          <h2>Payment</h2>
          <div className="cart-summary-row"><span>Total</span><span>{cartTotal} gp</span></div>
          <div className="cart-summary-row"><span>Gold Balance</span><span>{goldBalance} gp</span></div>
          <div className="cart-summary-row cart-summary-total">
            <span>Remaining</span>
            <span>{goldBalance - cartTotal} gp</span>
          </div>
          <button className="btn btn-gold btn-lg" onClick={handlePurchase} disabled={cartTotal > goldBalance}>
            Complete Purchase
          </button>
        </div>
      </div>
    </main>
  );
}

function Confirmation() {
  const { purchaseHistory } = useShop();
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const orderId = params.get('order');
  const order = purchaseHistory.find(o => o.id === orderId);

  if (!order) {
    const latest = purchaseHistory[0];
    if (!latest) {
      return (
        <main className="page">
          <h1>Order Confirmed</h1>
          <p className="empty-state">No recent orders found.</p>
          <Link to="/catalog" className="btn btn-gold">Shop Wands</Link>
        </main>
      );
    }
    return <OrderReceipt order={latest} />;
  }

  return <OrderReceipt order={order} />;
}

function OrderReceipt({ order }) {
  return (
    <main className="page confirmation-page">
      <div className="receipt">
        <div className="receipt-header">
          <h1>&#9889; Order Confirmed!</h1>
          <p>Your magical delivery is on its way.</p>
        </div>

        <div className="receipt-id">
          Order #{order.id}
        </div>

        <div className="receipt-items">
          {order.items.map(item => (
            <div key={item.id} className="receipt-item">
              <div className={`wand-visual wand-sm wand-${item.alignment.toLowerCase()}`}>
                {item.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div className="receipt-item-info">
                <strong>{item.name}</strong>
                <span>{item.alignment} Wand</span>
              </div>
              <div className="receipt-item-qty">x{item.quantity}</div>
              <div className="receipt-item-price">{item.price * item.quantity} gp</div>
            </div>
          ))}
        </div>

        <div className="receipt-total">
          <span>Total Charged</span>
          <span>{order.total} gp</span>
        </div>

        <div className="receipt-balance">
          <span>Remaining Balance</span>
          <span>{order.remainingBalance} gp</span>
        </div>

        <div className="receipt-delivery">
          <h3>&#128231; Magical Delivery Receipt</h3>
          <p>A spectral owl will deliver your wands within 1-3 business days.</p>
          <p className="receipt-eta">Expected arrival: {new Date(Date.now() + 86400000 * 2).toLocaleDateString()}</p>
        </div>

        <Link to="/catalog" className="btn btn-gold">Continue Shopping</Link>
      </div>
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
