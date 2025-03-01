import "./globals.css";
import Navbar from "../components/navbar";
import { UserProvider } from "../components/UserContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
