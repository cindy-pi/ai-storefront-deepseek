import { wandSvgUrl } from '../data/wandPlaceholder';

const RARITY_COLORS = {
  common: '#6b7280',
  uncommon: '#22c55e',
  rare: '#3b82f6',
  legendary: '#f59e0b',
};

const ALIGNMENT_COLORS = {
  good: '#93c5fd',
  neutral: '#a78bfa',
  evil: '#991b1b',
};

export default function WandCard({ wand, onViewDetails }) {
  const imgSrc = wand.imageUrl || wandSvgUrl(wand.name, wand.alignment, wand.rarity);
  return (
    <div className="wand-card">
      <div className="wand-card-image-wrap">
        <img src={imgSrc} alt={wand.name} className="wand-card-image" />
      </div>
      <h3 className="wand-card-name">{wand.name}</h3>
      <div className="wand-card-badges">
        <span
          className="badge badge-rarity"
          style={{ background: RARITY_COLORS[wand.rarity] || '#6b7280' }}
        >
          {wand.rarity}
        </span>
        <span
          className="badge badge-alignment"
          style={{ background: ALIGNMENT_COLORS[wand.alignment] || '#a78bfa' }}
        >
          {wand.alignment}
        </span>
      </div>
      <span className="wand-card-price">{wand.price} gp</span>
      <button className="btn btn-sm" onClick={() => onViewDetails(wand)}>
        View Details
      </button>
    </div>
  );
}
