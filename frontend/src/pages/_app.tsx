import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import Head from 'next/head';
import { ToastProvider } from '@/contexts/ToastContext';
import ToastContainer from '@/components/ui/Toast/ToastContainer';
import { PageLoading } from '@/components/ui/Loading';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(false);
  
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

  useEffect(() => {
    const handleRouteChangeStart = () => setIsPageLoading(true);
    const handleRouteChangeComplete = () => setIsPageLoading(false);
    const handleRouteChangeError = () => setIsPageLoading(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router.events]);

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
          content="real estate, property, rent, buy, sell, apartments, houses, homes, rental properties, property search, property management"
        />
        <meta name="author" content="RentSmart" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />

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
          <ToastProvider>
            {isPageLoading ? (
              <PageLoading />
            ) : (
              <Component {...pageProps} />
            )}
            <ToastContainer />
            <ReactQueryDevtools initialIsOpen={false} />
          </ToastProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
