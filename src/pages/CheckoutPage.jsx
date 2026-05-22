import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function CheckoutPage() {
  const { cart, cartTotal, goldBalance, checkout } = useShop();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

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

  const insufficientGold = cartTotal > goldBalance;
  const goldShortfall = cartTotal - goldBalance;

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

          <div className="checkout-delivery-fields">
            <h2>Delivery Details</h2>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="address">Magical Delivery Address</label>
              <input
                id="address"
                type="text"
                placeholder="e.g. The Leaky Cauldron, Diagon Alley"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="checkout-summary">
          <h2>Payment</h2>
          <div className="cart-summary-row"><span>Total</span><span>{cartTotal} gp</span></div>
          <div className="cart-summary-row"><span>Gold Balance</span><span>{goldBalance} gp</span></div>
          <div className="cart-summary-row cart-summary-total">
            <span>Remaining</span>
            <span className={insufficientGold ? 'text-danger' : ''}>
              {goldBalance - cartTotal} gp
            </span>
          </div>
          {insufficientGold && (
            <p className="text-danger">
              Insufficient gold! You need {goldShortfall} more gp.
            </p>
          )}
          <button
            className="btn btn-gold btn-lg"
            onClick={handlePurchase}
            disabled={insufficientGold}
          >
            Complete Purchase
          </button>
        </div>
      </div>
    </main>
  );
}
