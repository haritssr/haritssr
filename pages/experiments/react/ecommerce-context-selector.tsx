import {
  useLogin,
  useLogout,
  useUser,
  useCartCount,
  useAddToCart,
  StoreContextProvider,
} from '../../../utils/store-context-selector.js';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { ExternalCodeLink, SubTitle } from '@/components/DesignSystem';

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
        Minimizing rerender using Daishi Kato&apos;s{' '}
        <ExternalCodeLink href='https://github.com/dai-shi/use-context-selector'>
          use-context-selector
        </ExternalCodeLink>
      </SubTitle>
      <StoreContextProvider>
        <ContextPage />
      </StoreContextProvider>
    </LayoutToExperiments>
  );
}
