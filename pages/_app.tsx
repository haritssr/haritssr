import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { IdProvider } from '@radix-ui/react-id';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <IdProvider>
      <Component {...pageProps} />
    </IdProvider>
  );
}
