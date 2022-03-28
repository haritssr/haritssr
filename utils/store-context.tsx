import { useState, createContext, useContext } from 'react';

const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => (
  <StoreContext.Provider value={useStore()}>{children}</StoreContext.Provider>
);

const useStore = () => {
  const [user, setUser] = useState('');
  const [cartCount, setCartCount] = useState(0);
  return {
    user,
    cartCount,
    login: () => setUser('Jack'),
    logout: () => setUser(''),
    addToCart: () => setCartCount(cartCount + 1),
  };
};

export const useLogin = () => useContext(StoreContext).login;
export const useLogout = () => useContext(StoreContext).logout;
export const useUser = () => useContext(StoreContext).user;
export const useCartCount = () => useContext(StoreContext).cartCount;
export const useAddToCart = () => useContext(StoreContext).addToCart;

// export const useLogin = () => useContext(state => state.login);
// export const useLogout = () => useContext(state => state.logout);
// export const useUser = () => useContext(state => state.user);
// export const useCartCount = () => useContext(state => state.cartCount);
// export const useAddToCart = () => useContext(state => state.addToCart);

// import create from 'zustand';

// const useStore = create(set => ({
//   user: '',
//   cartCount: 0,
//   addToCart: () => set(state => ({ cartCount: state.cartCount + 1 })),
//   login: () => set(state => ({ user: 'Jack' })),
//   logout: () => set(state => ({ user: '' })),
// }));
