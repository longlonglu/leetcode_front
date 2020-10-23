import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Header from "../components/header/Header"
import HeaderLinks from "../components/header/HeaderLink.js"
import styles from "../assets/components/HomeStyle"
import Parallax from "../components/parallax/Parallax"
import Grid from "@material-ui/core/Grid"
import HomeWorkSection from "../components/WorkSection/HomeWorkSection"

const useStyles = makeStyles(styles)
export default function Home(props) {
  const classes = useStyles()
  const { ...rest } = props
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
      <Parallax image={require("../assets/image/background.jpg")}>
        <div className={classes.container}>
          <Grid>
            <Grid item>
              <div className={classes.brand}>
                <h1 className={classes.title}>This is Home</h1>
                <h3 className={classes.subtitle}>This is a test too</h3>
              </div>
            </Grid>
          </Grid>
        </div>
      </Parallax>
      <div className={classes.mainRaised}>
        <HomeWorkSection />
      </div>
    </div>
  )
}
