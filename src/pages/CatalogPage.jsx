import { useState } from 'react';
import wands, { alignments } from '../data/wands';
import WandCard from '../components/WandCard';
import WandDetailModal from '../components/WandDetailModal';

export default function CatalogPage() {
  const [filter, setFilter] = useState('All');
  const [selectedWand, setSelectedWand] = useState(null);

  const filtered = filter === 'All' ? wands : wands.filter(w => w.alignment === filter);

  return (
    <main className="page">
      <h1>Wand Catalog</h1>
      <p className="page-subtitle">Browse our collection of {wands.length} finely crafted wands.</p>

      <div className="filter-bar">
        <button className={`btn btn-filter ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
        {alignments.map(a => (
          <button key={a} className={`btn btn-filter ${filter === a ? 'active' : ''}`} onClick={() => setFilter(a)}>
            {a.charAt(0).toUpperCase() + a.slice(1)}
          </button>
        ))}
      </div>

      <div className="catalog-grid">
        {filtered.map(wand => (
          <WandCard key={wand.id} wand={wand} onViewDetails={setSelectedWand} />
        ))}
      </div>

      {selectedWand && (
        <WandDetailModal wand={selectedWand} onClose={() => setSelectedWand(null)} />
      )}
    </main>
  );
}
