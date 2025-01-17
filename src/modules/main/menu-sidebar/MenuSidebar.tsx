import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {MenuItem} from '@components';

export interface IMenuItem {
  name: string;
  path?: string;
  children?: Array<IMenuItem>;
}

export const MENU: IMenuItem[] = [
  {
    name: 'Books',
    path: '/books'
  },
  {
    name: 'Courses',
    path: '/courses'
  },
  {
    name: 'Announcements',
    path: '/announcements'
  }
];

const MenuSidebar = () => {
  const user = useSelector((state: any) => state.auth.currentUser);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);

  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
      <Link to="/" className="brand-link">
        <img
          src="/img/logo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{opacity: '.8'}}
        />
        <span className="brand-text font-weight-light">IIITN Dashboard</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={user.picture || '/img/default-profile.png'}
              className="img-circle elevation-2"
              alt="User"
            />
          </div>
          <div className="info" style={{color: 'white'}}>
            {user.email}
          </div>
        </div>
        <nav className="mt-2" style={{overflowY: 'hidden'}}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${
              menuItemFlat ? ' nav-flat' : ''
            }${menuChildIndent ? ' nav-child-indent' : ''}`}
            role="menu"
          >
            {MENU.map((menuItem: IMenuItem) => (
              <MenuItem key={menuItem.name} menuItem={menuItem} />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
