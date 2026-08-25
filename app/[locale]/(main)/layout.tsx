import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { isAuthenticated } from '@/lib/auth';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = await isAuthenticated();

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      {children}
      <Footer />
    </>
  );
}
