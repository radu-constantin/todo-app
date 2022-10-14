import styles from './NavItem.module.css'

function NavItem(props) {
  return (
    <li className={styles.navItem} >
      <a href='#' onClick={props.logoutHandler}>{props.text}</a>
    </li>
  )
}

export default NavItem;