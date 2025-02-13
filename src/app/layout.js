
// src/app/layout.js
import './global.css';
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