import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import styles from "../../assets/components/HeaderLinkStyle"
const useStyles = makeStyles(styles)
export default function HeaderLinks() {
  const classes = useStyles()
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link to={"/"}>
          <Button className={classes.navLink}>Home</Button>
        </Link>
        <Link to={"/questions"}>
          <Button className={classes.navLink}>Question</Button>
        </Link>
        <Link to={"/topics"}>
          <Button className={classes.navLink}>Topic</Button>
        </Link>
      </ListItem>
    </List>
  )
}
