import React, { useState, useEffect } from "react"
import { Button, makeStyles, Paper } from "@material-ui/core"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { useAuthContext } from "../AuthContext"
import { Redirect } from "react-router-dom"
import AdminTopics from "./AdminTopics"
import AdminQuestions from "./AdminQuestions"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import style from "../assets/components/AdminStyle"

const useStyles = makeStyles(style)
export default function HomePage() {
  const classes = useStyles()
  const [tabValue, setTabValue] = React.useState(0)
  const { logout, auth } = useAuthContext()
  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const [userName, setUserName] = useState("")
  useEffect(() => {
    setUserName(localStorage.getItem("user"))
  }, [])
  return (
    <div className={classes.section}>
      <Button
        variant="contained"
        onClick={logout}
        color="default"
        startIcon={<ExitToAppIcon />}
      >
        Log Out
      </Button>
      {!auth && <Redirect to={"/"} />}
      <div className={classes.title}>{"Hello " + userName}</div>

      <Paper elevation={3}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          centered={true}
          indicatorColor={"primary"}
          textColor={"primary"}
        >
          <Tab label="Topic" className={classes.description} />
          <Tab label="Question" className={classes.description} />
        </Tabs>
        {tabValue === 0 && <AdminTopics userName={userName} />}
        {tabValue === 1 && <AdminQuestions userName={userName} />}
      </Paper>
    </div>
  )
}
