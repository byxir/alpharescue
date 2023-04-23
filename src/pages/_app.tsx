import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import "../styles/globals.css";

export const benzin = localFont({
  src: [
    {
      path: "../fonts/Benzin-Semibold.ttf",
    },
  ],
  variable: "--font-benzin",
});
export const montserrat = localFont({
  src: [
    {
      path: "../fonts/Montserrat-Bold.ttf",
    },
  ],
  variable: "--font-montserratBold",
});
export const montserratRegular = localFont({
  src: [
    {
      path: "../fonts/Montserrat-Regular.ttf",
    },
  ],
  variable: "--font-montserratRegular",
});
export const abibas = localFont({
  src: [
    {
      path: "../fonts/Abibas.ttf",
    },
  ],
  variable: "--font-abibas",
});

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Banner from "~/components/RunningRaffleBanner";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <main
      lang="en"
      className={`${benzin.variable} ${montserratRegular.variable} ${abibas.variable} ${montserrat.variable} font-sans`}
    >
      <SessionProvider session={session}>
        <Banner />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
      </SessionProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
