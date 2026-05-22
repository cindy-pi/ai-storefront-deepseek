import { useState } from 'react';
import { Link } from 'react-router-dom';
import wands from '../data/wands';
import WandCard from '../components/WandCard';
import WandDetailModal from '../components/WandDetailModal';

export default function HomePage() {
  const [selectedWand, setSelectedWand] = useState(null);
  const featured = wands.filter(w => w.rarity === 'legendary').slice(0, 3);
  return (
    <main className="page">
      <section className="hero">
        <h1>✦ Fizban's Wand Emporium ✦</h1>
        <p className="hero-subtitle">Discover enchanted wands for every wizard, sorcerer, and adventurer. <br />From the gleaming shelves of the Fabulous Fizban himself.</p>
        <Link to="/catalog" className="btn btn-gold btn-lg">Browse the Catalog</Link>
      </section>

      <section className="featured-section">
        <h2>Legendary Wands</h2>
        <div className="catalog-grid">
          {featured.map(wand => (
            <WandCard key={wand.id} wand={wand} onViewDetails={setSelectedWand} />
          ))}
        </div>
      </section>

      {selectedWand && (
        <WandDetailModal wand={selectedWand} onClose={() => setSelectedWand(null)} />
      )}
    </main>
  );
}
