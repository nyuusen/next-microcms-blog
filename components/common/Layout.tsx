import { NextPage } from 'next';
import Header from './Header';
import Footer from './Footer';

interface Prop {
  children: React.ReactNode;
}

const Layout: NextPage<Prop> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
