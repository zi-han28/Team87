<<<<<<< HEAD
import './globals.css';
import Navbar from '../components/navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container bg-purple-700 mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
=======
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
>>>>>>> a6bc516303a69f9d6d3cbb6a913b87c8f7b58f61
