import { NextPage } from 'next';
import Header from 'components/Header';
import Footer from 'components/Footer';

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

