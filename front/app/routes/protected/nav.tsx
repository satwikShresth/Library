import { isLoggedIn, useAuth } from '#/hooks/useAuth';
import { NavLink } from 'react-router';
import { Github } from 'lucide-react';

export default () => {
  const { user, logout } = useAuth();

  const navLinkClasses = ({ isActive }: {
    isActive: boolean;
  }): string => {
    return `
      px-6 py-4
      font-medium
      transition-colors
      duration-200
      border-b-2
      ${isActive
        ? 'text-blue-400 border-blue-400'
        : 'text-gray-400 border-transparent hover:text-gray-200 hover:border-gray-400'
      }
    `;
  };

  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {
              isLoggedIn()
                ? (
                  <>
                    <NavLink to="/" end className={navLinkClasses}>
                      Home
                    </NavLink>
                    <NavLink to="/book" className={navLinkClasses}>
                      Books
                    </NavLink>
                    <NavLink to="/author" className={navLinkClasses}>
                      Authors
                    </NavLink>
                  </>
                )
                : (<></>)
            }
          </div>
          <div className="flex items-center">
          {
            isLoggedIn()
              ? (
                <>
                  <button
                    onClick={logout}
                    className={navLinkClasses({ isActive: false })}
                  >
                    {user?.username || "Logout"}
                  </button>
                </>
              )
              : (
                <>
                  <NavLink to="/login" className={navLinkClasses}>
                    Login
                  </NavLink>
                </>
              )
          }
          <a 
            href="https://github.com/satwikShresth/Library"
            target="_blank"
            rel="noopener noreferrer"
            className={"flex items-center gap-2 px-6 py-4" + navLinkClasses({ isActive: false })}
          >
            <Github size={20} />
            <span>GitHub</span>
          </a>
        </div>
        </div>
      </div>
    </nav>
  );
};
