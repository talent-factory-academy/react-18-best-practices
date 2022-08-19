import { Link, NavLink } from 'react-router-dom';

export function NavBar() {
  return <div className="bg-dark p-4 w-100">
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
    </div>
  </div>
}
