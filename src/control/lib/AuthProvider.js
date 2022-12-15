import { createContext } from 'react'
import { observer } from 'mobx-react-lite'
import API from '../API'
export const AuthContext = createContext(null);

const AuthProvider = observer(({ children }) => {
  const handleLogout = (e, user, token) => {
    e.preventDefault();
    API.Logout(user, token);
  };
  const handleLogin = (e, form) => {
    e.preventDefault();
    API.Authorize(form);
  };
  const value = {
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
});

export default AuthProvider;
