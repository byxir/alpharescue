import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";

const benzin = localFont({
  src: [
    {
      path: "../fonts/Benzin-Semibold.ttf",
    },
  ],
  variable: "--font-Benzin",
});

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <html lang="en" className={`${benzin.variable} font-sans`}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </html>
  );
};

export default api.withTRPC(MyApp);
