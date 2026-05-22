import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

function OrderReceipt({ order }) {
  return (
    <main className="page confirmation-page">
      <div className="receipt">
        <div className="receipt-header">
          <h1>&#9889; Order Confirmed!</h1>
          <p>Your magical delivery is on its way.</p>
        </div>

        <div className="receipt-id">
          Order #{order.id}
        </div>

        <div className="receipt-items">
          {order.items.map(item => (
            <div key={item.id} className="receipt-item">
              <div className={`wand-visual wand-sm wand-${item.alignment.toLowerCase()}`}>
                {item.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div className="receipt-item-info">
                <strong>{item.name}</strong>
                <span>{item.alignment} Wand</span>
              </div>
              <div className="receipt-item-qty">x{item.quantity}</div>
              <div className="receipt-item-price">{item.price * item.quantity} gp</div>
            </div>
          ))}
        </div>

        <div className="receipt-total">
          <span>Total Charged</span>
          <span>{order.total} gp</span>
        </div>

        <div className="receipt-balance">
          <span>Remaining Balance</span>
          <span>{order.remainingBalance} gp</span>
        </div>

        <div className="receipt-delivery">
          <h3>&#128231; Magical Delivery Receipt</h3>
          <p>A spectral owl will deliver your wands within 1-3 business days.</p>
          <p className="receipt-eta">Expected arrival: {new Date(Date.now() + 86400000 * 2).toLocaleDateString()}</p>
        </div>

        <Link to="/catalog" className="btn btn-gold">Continue Shopping</Link>
      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  const { purchaseHistory } = useShop();
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const orderId = params.get('order');
  const order = purchaseHistory.find(o => o.id === orderId);

  if (!order) {
    const latest = purchaseHistory[0];
    if (!latest) {
      return (
        <main className="page">
          <h1>Order Confirmed</h1>
          <p className="empty-state">No recent orders found.</p>
          <Link to="/catalog" className="btn btn-gold">Shop Wands</Link>
        </main>
      );
    }
    return <OrderReceipt order={latest} />;
  }

  return <OrderReceipt order={order} />;
}
