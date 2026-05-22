import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function CartPage() {
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
