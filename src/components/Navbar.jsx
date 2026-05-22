import { Link } from 'react-router-dom';
import './Navbar.css';

const cartItemCount = 0;

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Fizban's Wands</Link>
      <div className="navbar-links">
        <Link to="/catalog">Catalog</Link>
        <Link to="/cart" className="cart-link">
          <span className="cart-icon">&#128092;</span>
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}
