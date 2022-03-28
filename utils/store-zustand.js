import create from 'zustand';

const useStore = create(set => ({
  user: '',
  cartCount: 0,
  addToCart: () => set(state => ({ cartCount: state.cartCount + 1 })),
  login: () => set(state => ({ user: 'Jack' })),
  logout: () => set(state => ({ user: '' })),
}));

export const useLogin = () => useStore(state => state.login);
export const useLogout = () => useStore(state => state.logout);
export const useUser = () => useStore(state => state.user);
export const useCartCount = () => useStore(state => state.cartCount);
export const useAddToCart = () => useStore(state => state.addToCart);
