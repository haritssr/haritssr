import { useLogin, useLogout, useUser, useCartCount, useAddToCart } from '../../../utils/store-zustand';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { SubTitle } from '@/components/DesignSystem';

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

export default function EccomerceZustand() {
  return (
    <LayoutToExperiments title='Eccomerce Zustand' domain='React'>
      <SubTitle>
        Using Zustand to only render what correlated. Please activate your React dev tools profiler
        and checklist the \\Highlight updates when components render.&92;
      </SubTitle>
      <div className={`${divStyle} space-y-2`}>
        <LoginSection />
        <UserSection />
        <AddToCartSection />
        <CartCountSection />
      </div>
    </LayoutToExperiments>
  );
}
