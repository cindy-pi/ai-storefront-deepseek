import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import './Navbar.css';

export default function Navbar() {
  const { cartCount, goldBalance } = useShop();
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Fizban's Wands</Link>
      <div className="navbar-links">
        <span className="navbar-gold">🪙 {goldBalance.toLocaleString()} gp</span>
        <Link to="/catalog">Catalog</Link>
        <Link to="/cart" className="cart-link">
          <span className="cart-icon">&#128092;</span>
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}
