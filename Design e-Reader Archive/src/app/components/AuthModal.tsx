import { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, UserIcon } from 'lucide-react';
import { useAuth } from './AuthContext';

const font = {
  display: 'Zilla Slab, Bitter, serif',
  body: 'DM Sans, sans-serif',
  mono: 'JetBrains Mono, monospace',
};

const c = {
  rust: '#E35336',
  cream: '#F5F5DC',
  sienna: '#A0522D',
  sand: '#F4A460',
};

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (mode === 'signup' && !username) {
      setError('Please enter a username');
      return;
    }
    setSubmitting(true);
    const authError = mode === 'signin'
      ? await login(email, password)
      : await signup(email, username, password);
    setSubmitting(false);
    if (authError) {
      setError(authError);
      return;
    }
    onClose();
    setEmail('');
    setUsername('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: c.cream }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header strip */}
        <div className="h-2" style={{ backgroundColor: c.rust }} />

        <div className="p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-lg hover:bg-[#EDE8D5] transition-colors cursor-pointer"
            style={{ color: c.sienna }}
          >
            <X size={18} />
          </button>

          {/* Logo / Title */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
              style={{ backgroundColor: c.rust + '15', border: `2px solid ${c.rust}33` }}
            >
              <span style={{ fontSize: '24px' }}>🎴</span>
            </div>
            <h2 style={{ fontFamily: font.display, fontSize: '26px', fontWeight: 700, color: c.sienna }}>
              {mode === 'signin' ? 'Welcome Back' : 'Join the Archive'}
            </h2>
            <p style={{ fontFamily: font.body, fontSize: '14px', color: '#8B7355', marginTop: '4px' }}>
              {mode === 'signin'
                ? 'Sign in to your e-Reader Archive account'
                : 'Create an account to track your collection'}
            </p>
          </div>

          {/* Tab toggle */}
          <div
            className="flex rounded-xl p-1 mb-6"
            style={{ backgroundColor: c.sienna + '12' }}
          >
            {(['signin', 'signup'] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                className="flex-1 py-2 rounded-lg transition-all cursor-pointer"
                style={{
                  fontFamily: font.body,
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: mode === m ? '#fff' : 'transparent',
                  color: mode === m ? c.sienna : '#8B7355',
                  boxShadow: mode === m ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {m === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 600, color: c.sienna }} className="block mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#8B7355' }} />
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="dotcode_collector"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-colors"
                    style={{
                      fontFamily: font.body,
                      fontSize: '14px',
                      color: c.sienna,
                      borderColor: c.sienna + '33',
                      backgroundColor: '#fff',
                    }}
                    onFocus={e => (e.target.style.borderColor = c.rust)}
                    onBlur={e => (e.target.style.borderColor = c.sienna + '33')}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 600, color: c.sienna }} className="block mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#8B7355' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-colors"
                  style={{
                    fontFamily: font.body,
                    fontSize: '14px',
                    color: c.sienna,
                    borderColor: c.sienna + '33',
                    backgroundColor: '#fff',
                  }}
                  onFocus={e => (e.target.style.borderColor = c.rust)}
                  onBlur={e => (e.target.style.borderColor = c.sienna + '33')}
                />
              </div>
            </div>

            <div>
              <label style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 600, color: c.sienna }} className="block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#8B7355' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl border outline-none transition-colors"
                  style={{
                    fontFamily: font.body,
                    fontSize: '14px',
                    color: c.sienna,
                    borderColor: c.sienna + '33',
                    backgroundColor: '#fff',
                  }}
                  onFocus={e => (e.target.style.borderColor = c.rust)}
                  onBlur={e => (e.target.style.borderColor = c.sienna + '33')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-0 bg-transparent border-none"
                  style={{ color: '#8B7355' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === 'signin' && (
              <div className="text-right">
                <button
                  type="button"
                  className="bg-transparent border-none cursor-pointer p-0"
                  style={{ fontFamily: font.body, fontSize: '13px', color: c.rust }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {error && (
              <p style={{ fontFamily: font.body, fontSize: '13px', color: c.rust }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl border-none cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                fontFamily: font.body,
                fontSize: '15px',
                fontWeight: 600,
                backgroundColor: c.rust,
                color: '#fff',
              }}
            >
              {submitting ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: c.sienna + '22' }} />
            <span style={{ fontFamily: font.body, fontSize: '12px', color: '#8B7355' }}>or continue with</span>
            <div className="flex-1 h-px" style={{ backgroundColor: c.sienna + '22' }} />
          </div>

          {/* Social buttons */}
          <div className="flex gap-3">
            {['Google', 'Nintendo'].map(provider => (
              <button
                key={provider}
                onClick={() => setError('Social login coming soon')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border cursor-pointer transition-colors hover:bg-[#EDE8D5]"
                style={{
                  fontFamily: font.body,
                  fontSize: '13px',
                  fontWeight: 500,
                  color: c.sienna,
                  borderColor: c.sienna + '33',
                  backgroundColor: '#fff',
                }}
              >
                <span>{provider === 'Google' ? '🔍' : '🎮'}</span>
                {provider}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
