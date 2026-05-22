import { wandSvgUrl } from '../data/wandPlaceholder';
import { useShop } from '../context/ShopContext';

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

export default function WandDetailModal({ wand, onClose }) {
  const { addToCart } = useShop();
  if (!wand) return null;

  const imgSrc = wand.imageUrl || wandSvgUrl(wand.name, wand.alignment, wand.rarity);
  const rarityColor = RARITY_COLORS[wand.rarity] || '#6b7280';
  const alignColor = ALIGNMENT_COLORS[wand.alignment] || '#a78bfa';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-detail" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-detail-image-wrap">
          <img src={imgSrc} alt={wand.name} className="modal-detail-image" />
        </div>
        <h2 className="modal-detail-name">{wand.name}</h2>
        <div className="modal-detail-badges">
          <span className="badge badge-rarity" style={{ background: rarityColor }}>
            {wand.rarity}
          </span>
          <span className="badge badge-alignment" style={{ background: alignColor }}>
            {wand.alignment}
          </span>
        </div>
        <p className="modal-detail-description">{wand.description}</p>
        <div className="modal-detail-properties">
          <strong>Magical Properties:</strong>
          <ul>
            {wand.magicalProperties.map((prop, i) => (
              <li key={i}>{prop}</li>
            ))}
          </ul>
        </div>
        <span className="modal-detail-price">{wand.price} gp</span>
        <button
          className="btn btn-gold"
          onClick={() => { addToCart(wand); onClose(); }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
