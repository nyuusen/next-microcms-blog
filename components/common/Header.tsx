import Link from 'next/link';
import Image from 'next/image';
import ProfileImage from '../../public/profile.jpg';

const Header = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href={'/'} passHref>
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl">on.</span>
          </a>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href={'/articles'} passHref>
            <Image src={ProfileImage} width={50} height={50} />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
