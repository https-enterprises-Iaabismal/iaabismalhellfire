import "./globals.css";
export const metadata = {
  title: "IAABISMAL HELLFIRE",
  manifest: "/manifest.json",
  themeColor: "#8B0000",
};
export default function RootLayout({children}:{children:React.ReactNode}){return(<html lang="es"><head><link rel="manifest" href="/manifest.json"/><meta name="theme-color" content="#8B0000"/><link rel="apple-touch-icon" href="/icons/icon-192.png"/></head><body style={{background:"#000",margin:0}}>{children}</body></html>);}
