import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { AnimateSharedLayout } from 'framer-motion';
import { IdProvider } from '@radix-ui/react-id';

function MyApp({ Component, pageProps }) {
  return (
    <IdProvider>
      <AnimateSharedLayout>
        <Component {...pageProps} />
      </AnimateSharedLayout>
    </IdProvider>
  );
}

export default MyApp;
