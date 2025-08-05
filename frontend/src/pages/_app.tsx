import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import '@/styles/globals.css';
import Head from 'next/head';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error) => {
              if (
                error &&
                typeof error === 'object' &&
                'code' in error &&
                error.code === 401
              ) {
                return false;
              }
              return failureCount < 3;
            },
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <>
      <Head>
        <title>RentSmart - Find Your Perfect Property</title>
        <meta
          name="description"
          content="Discover your dream home with RentSmart. Browse thousands of properties for rent and sale. Professional real estate platform with advanced search and virtual tours."
        />
        <meta
          name="keywords"
          content="real estate, property, rent, buy, sell, apartments, houses, homes"
        />
        <meta name="author" content="RentSmart" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
