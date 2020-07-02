import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Header from "../components/header/Header"
import HeaderLinks from "../components/header/HeaderLink.js"
import styles from "../assets/components/HomeStyle"
import TopicsWorkSection from "../components/WorkSection/TopicsWorkSection"
import { useLocation } from "react-router-dom"

const useStyles = makeStyles(styles)
export default function Topics(props) {
  let location = useLocation()
  const classes = useStyles()
  const { ...rest } = props
  const [hide, setHide] = useState(false)
  useEffect(() => {
    window.onpopstate = () => {
      if (
        location.pathname.substr(location.pathname.lastIndexOf("/") + 1) ===
        "topics"
      )
        setHide(false)
    }
  }, [])
  return (
    <div>
      <Header
        brand="Leetcool"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "white",
        }}
        {...rest}
      />
      <div className={classes.mainRaised}>
        <TopicsWorkSection state={{ hide, setHide }} />
      </div>
    </div>
  )
}
