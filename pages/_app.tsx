import { AppProps } from 'next/dist/shared/lib/router/router';
import '../styles/globals.css';
import Head from 'next/head';
import ym from 'react-yandex-metrika';
import { YMInitializer } from 'react-yandex-metrika';
import { useEffect } from 'react';

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  const onRouteChange = (url: string) => {
    ym('hit', url);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.events.on('routeChangeComplete', onRouteChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        router.events.off('routeChangeComplete', onRouteChange);
      }
    };
  });

  return (
    <>
      <Head>
        <title>MyTop - наш лучший топ</title>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}></meta>
        <meta property="og:locale" content="ru_RU" />
      </Head>
      <YMInitializer accounts={[]} options={{ webvisor: true, defer: true }} version="2" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
