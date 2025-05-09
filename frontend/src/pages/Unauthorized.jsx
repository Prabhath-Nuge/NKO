import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1 style={{ fontSize: '3rem', color: 'crimson' }}>403 - Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/" style={{ marginTop: '2rem', display: 'inline-block' }}>
        ⬅ Go to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
