import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import wands from '../data/wands';

export default function HomePage() {
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
