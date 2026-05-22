import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/', { replace: true }), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="page not-found">
      <h1>404</h1>
      <p>The magical path you seek does not exist — even Fizban can't find it.</p>
      <button className="btn btn-gold btn-lg" onClick={() => navigate('/')}>
        Return to the Emporium
      </button>
      <p style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.5 }}>
        Redirecting to home...
      </p>
    </main>
  );
}
