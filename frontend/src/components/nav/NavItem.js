import styles from './NavItem.module.css'

function NavItem(props) {
  return (
    <li className={styles.navItem}>
      {props.text}
    </li>
  )
}

export default NavItem;