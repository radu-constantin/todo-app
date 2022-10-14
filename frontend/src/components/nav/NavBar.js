import styles from './NavBar.module.css'

import NavItem from './NavItem'

function NavBar(props) {
  return (
    <nav>
      <ul>
        <NavItem text='MY ACCOUNT'/>
        <NavItem text='LOGOUT' logoutHandler={props.onLogout}/>
        <NavItem text='COMPLETED TODOS'/>
      </ul>
    </nav>
  )
}

export default NavBar;