// import "lenis/dist/lenis.css";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
// import LenisProvider from "./_components/LenisProvider";
import ScrollToTop from "./_components/ScrollToTop";
import FilterProvider from "./_context/FilterProvider";
import NavProvider from "./_context/NavProvider";
import { inter } from "./_lib/font";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Nexamedic |",
  description: "This site is under construction",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      {/* <LenisProvider> */}
      <body
        className={`${inter.className} bg-background text-darkblue relative overflow-x-hidden antialiased`}
      >
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
