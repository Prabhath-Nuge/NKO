import { Link, useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1 style={{ fontSize: '3rem', color: 'crimson' }}>403 - Unauthorized</h1>
      <p className='text-white'>You do not have permission to access this page.</p>
      <Link to="/" className='text-white' style={{ marginTop: '2rem', display: 'inline-block' }}>
        ⬅ Go to Home
      </Link><div></div>
      <Link to={navigate(-1)} className='text-white' style={{ marginTop: '2rem', display: 'inline-block' }}>
        ⬅ Go Previous Page
      </Link>

    </div>
  );
};

export default Unauthorized;
