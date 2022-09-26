import styles from './NavBar.module.css'

import NavItem from './NavItem'

function NavBar() {
  return (
    <nav>
      <ul>
        <NavItem text='MY ACCOUNT'/>
        <NavItem text='LOGOUT'/>
        <NavItem text='COMPLETED TODOS'/>
      </ul>
    </nav>
  )
}

export default NavBar;