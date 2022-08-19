import { NavLink, Outlet } from 'react-router-dom';

export default function CMSPage() {
  return <>
      <div className="btn-group">
        <NavLink
          to="news"
          className="btn btn-outline-dark"
          style={({ isActive }) => isActive ? { backgroundColor: '#666'} : {}}
        > news </NavLink>

        <NavLink
          to="products"
          className="btn btn-outline-dark"
          style={({ isActive }) => isActive ? { backgroundColor: '#666'} : {}}
        > Products </NavLink>
      </div>

      {/*Page Content*/}
      <div className="mt-4">
        <Outlet />
      </div>
    </>
}
