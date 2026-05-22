import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import wands, { alignments } from '../data/wands';

export default function CatalogPage() {
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
