import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from 'components/Header';
import { MantineProvider } from '@mantine/core';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MantineProvider
        theme={{
          fontFamily: 'Open Sans, sans serif',
          spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
        }}>
        <Header />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
