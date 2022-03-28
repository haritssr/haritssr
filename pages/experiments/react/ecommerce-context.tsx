import {
  useLogin,
  useLogout,
  useUser,
  useCartCount,
  useAddToCart,
  StoreContextProvider,
} from '../../../utils/store-context';
import LayoutToExperiments from '@/components/LayoutToExperiments';

const divStyle = 'p-2 border border-zinc-400 rounded-md';
const buttonStyle =
  'rounded-md border border-zinc-600 bg-zinc-200 hover:bg-zinc-300 text-sm px-1 py-0.5';

const LoginSection = () => {
  return (
    <div className={`${divStyle} space-x-2`}>
      <button className={buttonStyle} onClick={useLogin()}>
        Login
      </button>
      <button className={buttonStyle} onClick={useLogout()}>
        Logout
      </button>
    </div>
  );
};
const UserSection = () => {
  return <div className={divStyle}> User: {useUser()}</div>;
};
const CartCountSection = () => {
  return <div className={divStyle}>CartCount : {useCartCount()}</div>;
};

const AddToCartSection = () => {
  return (
    <button className={buttonStyle} onClick={useAddToCart()}>
      AddToCart
    </button>
  );
};

function ContextPage() {
  return (
    <LayoutToExperiments title='Zustand' domain='React'>
      <div className={`${divStyle} space-y-2`}>
        <LoginSection />
        <UserSection />
        <AddToCartSection />
        <CartCountSection />
      </div>
    </LayoutToExperiments>
  );
}

export default function ContextPageWrapper() {
  return (
    <StoreContextProvider>
      <ContextPage />
    </StoreContextProvider>
  );
}
