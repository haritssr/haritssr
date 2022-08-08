import {
  useLogin,
  useLogout,
  useUser,
  useCartCount,
  useAddToCart,
  StoreContextProvider,
} from '../../../utils/store-context-selector.js';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { ExternalLink, SubTitle } from '@/components/DesignSystem';

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

function ContextPage() {
  return (
    <div className={`${divStyle} space-y-2`}>
      <LoginSection />
      <UserSection />
      <AddToCartSection />
      <CartCountSection />
    </div>
  );
}

export default function ContextPageWrapper() {
  return (
    <LayoutToExperiments title='Counter Context useState' domain='React'>
      <SubTitle>
        Re-render experiments.Minimizing rerender using Daishi Kato&apos;s{' '}
        <ExternalLink
          name='use-context-selector'
          href='https://github.com/dai-shi/use-context-selector'
        />
      </SubTitle>
      <StoreContextProvider>
        <ContextPage />
      </StoreContextProvider>
    </LayoutToExperiments>
  );
}
