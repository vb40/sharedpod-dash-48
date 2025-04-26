
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Thank You!</h1>
        <p className="text-muted-foreground">You have been signed out successfully.</p>
        <p className="text-sm text-muted-foreground">Redirecting to home page...</p>
      </div>
    </div>
  );
};

export default ThankYou;
