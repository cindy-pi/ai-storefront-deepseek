import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

function WandSvg({ alignment, size }) {
  const colors = {
    Good: { stroke: '#4ade80', fill: '#22c55e' },
    Neutral: { stroke: '#fbbf24', fill: '#f59e0b' },
    Evil: { stroke: '#f87171', fill: '#ef4444' },
  };
  const c = colors[alignment] || colors.Neutral;
  const s = size || 60;

  return (
    <svg width={s} height={s} viewBox="0 0 60 60" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`wand-grad-${alignment}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.fill} />
          <stop offset="100%" stopColor={c.stroke} />
        </linearGradient>
      </defs>
      <rect x="22" y="2" width="16" height="8" rx="2" fill={`url(#wand-grad-${alignment})`} stroke={c.stroke} strokeWidth="1" />
      <rect x="24" y="10" width="12" height="32" rx="1" fill={`url(#wand-grad-${alignment})`} stroke={c.stroke} strokeWidth="1" />
      <rect x="20" y="42" width="20" height="16" rx="3" fill={`url(#wand-grad-${alignment})`} stroke={c.stroke} strokeWidth="1" />
      <circle cx="30" cy="6" r="2" fill="#fff" opacity="0.6" />
      <line x1="24" y1="38" x2="36" y2="38" stroke={c.stroke} strokeWidth="0.5" opacity="0.5" />
      <line x1="24" y1="40" x2="36" y2="40" stroke={c.stroke} strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function ConfirmationPage() {
  const { lastOrder, purchaseHistory } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lastOrder) {
      navigate('/', { replace: true });
    }
  }, [lastOrder, navigate]);

  if (!lastOrder) return null;

  const { orderId, customerName, deliveryAddress, timestamp, items, grandTotal, remainingBalance, fizbanMessage } = lastOrder;

  return (
    <main className="page confirmation-page">
      <div className="receipt-scroll">
        <div className="scroll-top">
          <div className="wax-seal" />
        </div>

        <div className="scroll-body">
          <div className="receipt-header">
            <h1>🧙 Fizban's Magical Delivery Receipt</h1>
            <p className="receipt-order-id">Order #{orderId}</p>
          </div>

          <div className="receipt-details">
            <div className="receipt-detail-row">
              <span>Customer</span>
              <span>{customerName}</span>
            </div>
            <div className="receipt-detail-row">
              <span>Delivery</span>
              <span>{deliveryAddress}</span>
            </div>
            <div className="receipt-detail-row">
              <span>Ordered</span>
              <span>{formatDate(timestamp)}</span>
            </div>
          </div>

          <div className="receipt-items">
            <div className="receipt-items-header">
              <span>Item</span>
              <span>Qty</span>
              <span>Price</span>
              <span>Total</span>
            </div>
            {items.map((item, i) => (
              <div key={i} className="receipt-item">
                <div className="receipt-item-wand">
                  <WandSvg alignment={item.wand.alignment} size={48} />
                </div>
                <div className="receipt-item-info">
                  <strong>{item.wand.name}</strong>
                  <span>{item.wand.alignment} Wand</span>
                </div>
                <span className="receipt-item-qty">{item.quantity}</span>
                <span className="receipt-item-unit">{item.wand.price} gp</span>
                <span className="receipt-item-price">{item.lineTotal} gp</span>
              </div>
            ))}
          </div>

          <div className="receipt-totals">
            <div className="receipt-total-row">
              <span>Order Total</span>
              <span>{grandTotal} gp</span>
            </div>
            <div className="receipt-total-row">
              <span>Remaining Gold</span>
              <span>{remainingBalance} gp</span>
            </div>
          </div>

          <div className="receipt-message">
            <p className="fizban-message">"{fizbanMessage}"</p>
            <p className="fizban-attribution">— Fizban the Fabulous</p>
          </div>

          <p className="receipt-eta">Your wands will arrive via magical courier within 3-7 astral days.</p>

          <div className="receipt-actions">
            <Link to="/catalog" className="btn btn-gold">Return to Shop</Link>
            <button className="btn btn-save" onClick={() => window.print()}>
              📜 Save Receipt
            </button>
          </div>
        </div>

        <div className="scroll-bottom" />
      </div>

      {purchaseHistory.length > 1 && (
        <section className="purchase-history">
          <h2>📜 Purchase History</h2>
          <div className="history-list">
            {purchaseHistory.map((order) => (
              <div key={order.orderId} className="history-item">
                <div className="history-item-header">
                  <span className="history-order-id">Order #{order.orderId}</span>
                  <span className="history-date">{formatDate(order.timestamp)}</span>
                  <span className="history-total">{order.grandTotal} gp</span>
                </div>
                <div className="history-item-body">
                  {order.items.map((item, i) => (
                    <span key={i} className="history-item-name">
                      {item.wand.name} x{item.quantity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
