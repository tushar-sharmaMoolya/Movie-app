import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import { useTheme } from '../context/ThemeContext';
import { useFormInput } from '../hooks/useFormInput';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import ThemeToggle from '../components/common/ThemeToggle';
import { FaFacebook, FaGoogle, FaApple } from 'react-icons/fa';
import './AuthPages.css';

/**
 * Login page component
 */
export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('email');

  const email = useFormInput('', (val) => {
    if (!val) return 'Email is required';
    // if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val)) return 'Invalid email format';
    return '';
  });

  const password = useFormInput('', (val) => {
    if (!val) return 'Password is required';
    return '';
  });

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    email.setTouched(true);
    password.setTouched(true);

    if (email.error || password.error) {
      setError('Please fix all errors');
      return;
    }

    setLoading(true);
    setError('');

    try {
      login(email.value, password.value);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setLoading(true);
    setError('');

    try {
      login(null, null, {
        provider,
        socialId: `${provider}-demo`,
      });
      navigate('/');
    } catch (err) {
      setError(err.message || `Failed to login with ${provider}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 className="auth-title" style={{ margin: 0 }}>Welcome Back</h1>
          <ThemeToggle />
        </div>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-method-toggle">
          <button
            className={`toggle-btn ${method === 'email' ? 'active' : ''}`}
            onClick={() => setMethod('email')}
          >
            Email
          </button>
          <button
            className={`toggle-btn ${method === 'social' ? 'active' : ''}`}
            onClick={() => setMethod('social')}
          >
            Social
          </button>
        </div>

        {method === 'email' ? (
          <form onSubmit={handleEmailLogin}>
            <InputField
              label="Email"
              type="email"
              placeholder="your@email.com"
              required
              {...email.bind}
              error={email.error}
              touched={email.touched}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
              required
              {...password.bind}
              error={password.error}
              touched={password.touched}
            />

            <Button type="submit" loading={loading} size="lg" className="auth-btn">
              Log In
            </Button>
          </form>
        ) : (
          <div className="social-register">
            <p className="social-label">Sign in with social account</p>
            <div className="social-buttons">
              <button
                className="social-btn facebook"
                onClick={() => handleSocialLogin('Facebook')}
                disabled={loading}
              >
                <FaFacebook /> Facebook
              </button>
              <button
                className="social-btn google"
                onClick={() => handleSocialLogin('Google')}
                disabled={loading}
              >
                <FaGoogle /> Google
              </button>
              <button
                className="social-btn apple"
                onClick={() => handleSocialLogin('Apple')}
                disabled={loading}
              >
                <FaApple /> Apple
              </button>
            </div>
          </div>
        )}

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
