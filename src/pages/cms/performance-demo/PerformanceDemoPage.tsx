import { NavLink, Outlet } from 'react-router-dom';

export default function PerformanceDemoPage() {
  return <div>
    <h1>PerformanceDemo Page</h1>

    <div className="btn-group">
      <NavLink
        to="useTransition"
        className="btn btn-outline-dark"
        style={({ isActive }) => isActive ? { backgroundColor: '#666'} : {}}
      > useTransition </NavLink>

      <NavLink
        to="useDeferredValue"
        className="btn btn-outline-dark"
        style={({ isActive }) => isActive ? { backgroundColor: '#666'} : {}}
      > useDeferredValue </NavLink>


      <NavLink
        to="memo-and-usecallback-1"
        className="btn btn-outline-dark"
        style={({ isActive }) => isActive ? { backgroundColor: '#666'} : {}}
      > memo & usecallback: 1 </NavLink>


      <NavLink
        to="memo-and-usecallback-2"
        className="btn btn-outline-dark"
        style={({ isActive }) => isActive ? { backgroundColor: '#666'} : {}}
      > memo & usecallback: 2 </NavLink>
    </div>

    {/*Page Content*/}
    <div className="mt-4">
      <Outlet />
    </div>
  </div>
}
