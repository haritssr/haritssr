import {
  useLogin,
  useLogout,
  useUser,
  useCartCount,
  useAddToCart,
} from '../../../utils/store-zustand';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { SubTitle } from '@/components/DesignSystem';

const divStyle = 'p-2 border border-zinc-400 rounded-md';

const LoginSection = () => {
  return (
    <div className={`${divStyle} space-x-2`}>
      <button onClick={useLogin()}>Login</button>
      <button onClick={useLogout()}>Logout</button>
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
  return <button onClick={useAddToCart()}>AddToCart</button>;
};

export default function EccomerceZustand() {
  return (
    <LayoutToExperiments title='Eccomerce Zustand' domain='React'>
      <SubTitle>
        Re-render experiments. Using Zustand to only render what correlated. Activate react dev
        tools profiler and checklist the highlight updates button to see when components render
        correspond to event.
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
