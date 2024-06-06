import { Link } from 'react-router-dom';
import mvLogo from '../assets/logoMV.svg';

function Header({ children }) {
  return (
    <header className="flex justify-between h-16 px-3 py-5 items-center">
      <span className="h-full ml-2">
        <Link to="/">
          <img src={mvLogo} alt="MV logo" className="h-full" />
        </Link>
      </span>
      <span>{children}</span>
    </header>
  );
}

export default Header;
