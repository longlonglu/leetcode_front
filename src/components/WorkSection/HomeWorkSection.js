import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"
import styles from "../../assets/components/WorkSectionStyle"

const useStyles = makeStyles(styles)

export default function HomeWorkSection() {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.section}>
        <Grid container justify="center">
          <Grid item cs={12} sm={12} md={12}>
            <h2 className={classes.title}>This is Home page</h2>
            <h4 className={classes.description}>
              Once You Finish This Sentence, You Will Lose 2 Seconds In Your
              Life. Thanks Alex.
            </h4>
          </Grid>
        </Grid>
        <Divider />
      </div>
    </div>
  )
}
