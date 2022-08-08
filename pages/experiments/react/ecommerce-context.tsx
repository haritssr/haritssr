import {
  useLogin,
  useLogout,
  useUser,
  useCartCount,
  useAddToCart,
  StoreContextProvider,
} from '../../../utils/store-context';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { SubTitle } from '@/components/DesignSystem';

const divStyle = 'p-2 border border-zinc-400 rounded-md';

export default function ContextPageWrapper() {
  return (
    <StoreContextProvider>
      <ContextPage />
    </StoreContextProvider>
  );
}

function ContextPage() {
  return (
    <LayoutToExperiments title='Ecommerse Context' domain='React'>
      <SubTitle>
        Re-render experiments. Using Context to only render what correlated. Activate react dev
        tools profiler and checklist the highlight updates button to see when components render
        correspond to event.
      </SubTitle>
      <div className='space-y-2 rounded-md border border-zinc-400 p-2'>
        <div className={`${divStyle} space-x-2`}>
          <button onClick={useLogin()}>Login</button>
          <button onClick={useLogout()}>Logout</button>
        </div>
        <div className={divStyle}> User: {useUser()}</div>
        <button onClick={useAddToCart()}>AddToCart</button>
        <div className={divStyle}>CartCount : {useCartCount()}</div>{' '}
      </div>
    </LayoutToExperiments>
  );
}
