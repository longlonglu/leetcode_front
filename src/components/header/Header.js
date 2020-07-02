import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import classNames from "classnames"
import styles from "../../assets/components/HeaderStyle"
const useStyles = makeStyles(styles)

export default function Header(props) {
  const classes = useStyles()
  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange)
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange)
      }
    }
  })
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props
    const windowsScrollTop = window.pageYOffset
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color])
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color])
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color])
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color])
    }
  }
  const { rightLinks, brand, fixed } = props
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes.fixed]: fixed,
  })

  const brandComponent = <Button className={classes.title}>{brand}</Button>
  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Link to={"/"}>{brandComponent}</Link>
        </div>
        {rightLinks}
      </Toolbar>
    </AppBar>
  )
}
