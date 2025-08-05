export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getRole = () => {
  const user = getUser();
  return user ? user.role : null;
};

export const isAuthenticated = () => {
  const token = getToken();
  // Simple check for token presence
  // In a real app, you would also check token expiration
  return !!token;
};

export const setAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};