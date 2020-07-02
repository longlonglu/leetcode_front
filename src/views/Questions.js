import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Header from "../components/header/Header"
import HeaderLinks from "../components/header/HeaderLink.js"
import styles from "../assets/components/HomeStyle"
import QuestionWorkSection from "../components/WorkSection/QuestionsWorkSection"
import { useLocation } from "react-router-dom"

const useStyles = makeStyles(styles)
export default function Questions(props) {
  let location = useLocation()
  const classes = useStyles()
  const { ...rest } = props
  const [hide, setHide] = useState(false)
  useEffect(() => {
    window.onpopstate = () => {
      if (
        location.pathname.substr(location.pathname.lastIndexOf("/") + 1) ===
        "questions"
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
        <QuestionWorkSection state={{ hide, setHide }} />
      </div>
    </div>
  )
}
