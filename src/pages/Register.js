// pages/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFormInput } from '../hooks/useFormInput';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import { FaFacebook, FaGoogle, FaApple } from 'react-icons/fa';
import './AuthPages.css';

/**
 * Register page component
 */
export const Register = () => {
  const navigate = useNavigate();
  const { register, emailExists } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('email'); // 'email' or 'social'

  const email = useFormInput('', (val) => {
    if (!val) return 'Email is required';
    // if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val)) return 'Invalid email format';
    if (emailExists(val)) return 'Email already registered';
    return '';
  });

  const password = useFormInput('', (val) => {
    if (!val) return 'Password is required';
    if (val.length < 6) return 'Password must be at least 6 characters';
    return '';
  });

  const confirmPassword = useFormInput('', (val) => {
    if (!val) return 'Please confirm password';
    if (val !== password.value) return 'Passwords do not match';
    return '';
  });

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    email.setTouched(true);
    password.setTouched(true);
    confirmPassword.setTouched(true);

    if (email.error || password.error || confirmPassword.error) {
      setError('Please fix all errors');
      return;
    }

    setLoading(true);
    setError('');

    try {
      register({
        email: email.value,
        password: password.value,
        method: 'email',
      });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    setLoading(true);
    try {
      const socialData = {
        email: `${provider.toLowerCase()}-user-${Date.now()}@social.local`,
        socialProvider: provider,
        socialId: `${provider}-${Date.now()}`,
        method: 'social',
        displayName: `${provider} User`,
      };
      register(socialData);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Create Account</h1>

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
          <form onSubmit={handleEmailRegister}>
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

            <InputField
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              required
              {...confirmPassword.bind}
              error={confirmPassword.error}
              touched={confirmPassword.touched}
            />

            <Button type="submit" loading={loading} size="lg" className="auth-btn">
              Create Account
            </Button>
          </form>
        ) : (
          <div className="social-register">
            <p className="social-label">Sign up with social account</p>
            <div className="social-buttons">
              <button
                className="social-btn facebook"
                onClick={() => handleSocialRegister('Facebook')}
                disabled={loading}
              >
                <FaFacebook /> Facebook
              </button>
              <button
                className="social-btn google"
                onClick={() => handleSocialRegister('Google')}
                disabled={loading}
              >
                <FaGoogle /> Google
              </button>
              <button
                className="social-btn apple"
                onClick={() => handleSocialRegister('Apple')}
                disabled={loading}
              >
                <FaApple /> Apple
              </button>
            </div>
          </div>
        )}

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
