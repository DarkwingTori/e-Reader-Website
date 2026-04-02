import { Link, useLocation, useNavigate } from 'react-router';
import { User, Menu, X, LogOut, BookOpen, Settings, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { AuthModal } from './AuthModal';

const font = {
  body: 'DM Sans, sans-serif',
  display: 'Bitter, serif',
};

const c = {
  rust: '#E35336',
  cream: '#F5F5DC',
  sienna: '#A0522D',
};

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const links = [
    { to: '/database', label: 'Database' },
    { to: '/collection', label: 'Collection' },
    { to: '/builder', label: 'Builder' },
    { to: '/ereader', label: 'e-Reader' },
    { to: '/series', label: 'Series' },
    { to: '/compatibility', label: 'Game Compatibility' },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#F5F5DC] border-b border-[rgba(160,82,45,0.3)]">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 700, color: c.sienna }}>e-Reader Archive</span>
          </Link>

          <div className="hidden md:flex items-center justify-center gap-8 flex-1">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`no-underline transition-colors ${isActive(l.to) ? 'text-[#E35336]' : 'text-[#A0522D] hover:text-[#E35336]'}`}
                style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 500 }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Profile button / dropdown */}
            <div className="relative" ref={dropdownRef}>
              {isLoggedIn && user ? (
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#EDE8D5] transition-colors cursor-pointer border-none bg-transparent"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                    style={{ backgroundColor: c.rust + '18', border: `1.5px solid ${c.rust}44` }}
                  >
                    🎴
                  </div>
                  <span className="hidden sm:block" style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, color: c.sienna }}>
                    {user.displayName}
                  </span>
                  <ChevronDown size={14} style={{ color: c.sienna }} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors hover:bg-[#EDE8D5]"
                  style={{
                    fontFamily: font.body,
                    fontSize: '13px',
                    fontWeight: 500,
                    color: c.sienna,
                    borderColor: c.sienna + '33',
                    backgroundColor: 'transparent',
                  }}
                >
                  <User size={15} />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              {/* Dropdown */}
              {dropdownOpen && isLoggedIn && user && (
                <div
                  className="absolute right-0 top-full mt-2 w-64 rounded-xl shadow-xl border overflow-hidden"
                  style={{ backgroundColor: c.cream, borderColor: c.sienna + '22' }}
                >
                  {/* User card */}
                  <div className="p-4" style={{ borderBottom: `1px solid ${c.sienna}15` }}>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                        style={{ backgroundColor: c.rust + '18', border: `2px solid ${c.rust}44` }}
                      >
                        🎴
                      </div>
                      <div>
                        <div style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 600, color: c.sienna }}>{user.displayName}</div>
                        <div style={{ fontFamily: font.body, fontSize: '12px', color: '#8B7355' }}>{user.email}</div>
                      </div>
                    </div>
                    {/* Mini stats */}
                    <div className="flex gap-4 mt-3 pt-3" style={{ borderTop: `1px solid ${c.sienna}10` }}>
                      <div className="text-center flex-1">
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', fontWeight: 600, color: c.sienna }}>{user.cardsOwned}</div>
                        <div style={{ fontFamily: font.body, fontSize: '10px', color: '#8B7355' }}>Owned</div>
                      </div>
                      <div className="text-center flex-1">
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', fontWeight: 600, color: c.sienna }}>{user.cardsWanted}</div>
                        <div style={{ fontFamily: font.body, fontSize: '10px', color: '#8B7355' }}>Wanted</div>
                      </div>
                      <div className="text-center flex-1">
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', fontWeight: 600, color: c.rust }}>{user.completionPct}%</div>
                        <div style={{ fontFamily: font.body, fontSize: '10px', color: '#8B7355' }}>Complete</div>
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    {[
                      { icon: <User size={15} />, label: 'My Profile', action: () => { navigate('/profile'); setDropdownOpen(false); } },
                      { icon: <BookOpen size={15} />, label: 'My Collection', action: () => { navigate('/collection'); setDropdownOpen(false); } },
                      { icon: <Settings size={15} />, label: 'Settings', action: () => { navigate('/profile'); setDropdownOpen(false); } },
                    ].map(item => (
                      <button
                        key={item.label}
                        onClick={item.action}
                        className="w-full flex items-center gap-3 px-4 py-2.5 border-none bg-transparent cursor-pointer transition-colors hover:bg-[#EDE8D5]"
                        style={{ fontFamily: font.body, fontSize: '13px', color: c.sienna }}
                      >
                        <span style={{ color: '#8B7355' }}>{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Sign out */}
                  <div style={{ borderTop: `1px solid ${c.sienna}15` }}>
                    <button
                      onClick={() => { logout(); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 border-none bg-transparent cursor-pointer transition-colors hover:bg-red-50"
                      style={{ fontFamily: font.body, fontSize: '13px', color: '#C62828' }}
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className="md:hidden p-2 rounded-lg hover:bg-[#EDE8D5] text-[#A0522D]" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-[rgba(160,82,45,0.15)] bg-[#F5F5DC] px-4 pb-3">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 no-underline ${isActive(l.to) ? 'text-[#E35336]' : 'text-[#A0522D]'}`}
                style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 500 }}
              >
                {l.label}
              </Link>
            ))}
            {!isLoggedIn && (
              <button
                onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                className="w-full mt-2 py-2 rounded-lg border-none cursor-pointer"
                style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 600, backgroundColor: c.rust, color: '#fff' }}
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </nav>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
