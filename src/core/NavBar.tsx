import clsx from 'clsx';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext, Theme } from './app.store';

interface NavBarProps {
  onChangeTheme: (theme: Theme) => void;
}
export function NavBar(props: NavBarProps) {
  const state = useContext(AppContext);

  return <div className={clsx(
    'p-4 w-100 d-flex justify-content-between',
    { 'bg-dark': state?.theme === 'dark' },
    { 'bg-light': state?.theme === 'light' },
  )}>
    <div className="btn-group">
      <NavLink
        to="/"
        className="btn btn-outline-info"
        style={({ isActive }) => isActive ? { backgroundColor: 'orange'} : {}}
      >Home</NavLink>
      <NavLink
        to="cms" className="btn btn-outline-info"
        style={({ isActive }) => isActive ? { backgroundColor: 'orange'} : {}}
      >CMS</NavLink>
      <NavLink
        to="performance-demo" className="btn btn-outline-info"
        style={({ isActive }) => isActive ? { backgroundColor: 'orange'} : {}}
      >Performance Demo</NavLink>
    </div>

    <div>
      <button onClick={() => props.onChangeTheme('dark')}
              className={clsx(
                'btn btn-sm btn-dark',
                { active: state?.theme === 'dark'}
              )}
      >dark</button>
      <button onClick={() => props.onChangeTheme('light')}
              className={clsx(
                'btn btn-sm btn-dark',
                { active: state?.theme === 'light'}
              )}
      >light</button>
    </div>
  </div>
}
