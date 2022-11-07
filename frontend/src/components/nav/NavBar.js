import styles from './NavBar.module.css'

import NavItem from './NavItem'

function NavBar({ onLogout }) {
  return (
    <nav>
      <ul>
        <NavItem text='TODO APP'/>
        <NavItem text='LOGOUT' logoutHandler={onLogout}/>
      </ul>
    </nav>
  )
}

export default NavBar;