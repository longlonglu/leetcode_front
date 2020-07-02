import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"
import styles from "../../assets/components/WorkSectionStyle"
import { Link } from "react-router-dom"

const useStyles = makeStyles(styles)

export default function OtherWorkSection() {
  const classes = useStyles()
  return (
    <>
      <div className={classes.section}>
        <Grid container justify="center">
          <Grid item cs={12} sm={12} md={12}>
            <h2 className={classes.title}>This is Other page</h2>
            <h4 className={classes.description}>
              Once You Finish This Sentence, You Will Lose 2 Seconds In Your
              Life.
            </h4>
          </Grid>
        </Grid>
        <Divider />
      </div>
    </>
  )
}
