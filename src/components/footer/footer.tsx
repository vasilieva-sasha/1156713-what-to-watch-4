import * as React from "react";
import {Link} from 'react-router-dom';
import {CurrentPage, AppRoute} from '../../common/consts';

interface Props {
  currentPage?: string;
}

const Footer: React.FunctionComponent<Props> = (props: Props) => {
  const {currentPage} = props;
  return (
    <footer className="page-footer">
      <div className="logo">
        {currentPage === CurrentPage.MAIN ?
          <a className="logo__link logo__link--light" href="#">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a> :
          <Link to={AppRoute.MAIN} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        }
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
