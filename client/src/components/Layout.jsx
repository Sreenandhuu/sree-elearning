import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navByRole = {
  student: [
    { to: '/', label: 'Today' },
    { to: '/courses', label: 'Browse courses' },
    { to: '/classes', label: 'Live classes' },
  ],
  parent: [
    { to: '/parent', label: 'My children' },
    { to: '/courses', label: 'Browse courses' },
  ],
  teacher: [
    { to: '/teacher', label: 'Teaching' },
    { to: '/courses', label: 'Courses' },
  ],
  admin: [
    { to: '/teacher', label: 'Teaching' },
    { to: '/courses', label: 'Courses' },
  ],
};

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = navByRole[user?.role] || [];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-slate-line bg-white">
        <div className="p-5 flex md:block items-center justify-between">
          <div>
            <div className="font-display text-xl font-extrabold leading-none">Sree Learn</div>
            <div className="text-xs text-muted mt-1">{user?.name}</div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="md:hidden text-sm text-muted underline"
          >
            Sign out
          </button>
        </div>

        <nav className="px-3 pb-4 flex md:flex-col gap-1 overflow-x-auto">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-3 py-2 text-sm rounded-card whitespace-nowrap ${
                  isActive ? 'bg-ink text-white' : 'text-muted hover:bg-paper hover:text-ink'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block px-5 pb-5 mt-auto">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="text-sm text-muted hover:text-ink underline"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="max-w-5xl mx-auto px-5 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
