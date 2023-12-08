import React from 'react';
import {Link} from 'react-router-dom';

interface Props extends React.PropsWithChildren {

}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <>
      <header className="container mb-5 pt-3">
        <Link to="/" className="text-secondary text-decoration-none">Calorie tracker</Link>
      </header>
      <main className="container">
        {children}
      </main>
    </>
  );
};

export default Layout;