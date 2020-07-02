import React, { useState, useEffect } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import MarkDown from "../components/helper/MarkDown"
import Snackbar from "@material-ui/core/Snackbar"
import Button from "@material-ui/core/Button"
import Alert from "@material-ui/lab/Alert"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import styles from "../assets/components/LayoutStyle"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Avatar from "@material-ui/core/Avatar"
import { Link } from "react-router-dom"
import { Divider, Box } from "@material-ui/core"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Chip from "@material-ui/core/Chip"
import Card from "@material-ui/core/Card"
import url from "../components/helper/Url"

const useStyles = makeStyles(styles)
export default function Layout(props) {
  const { db, preUser, preDate, preTitle, preType, predescription } = props
  const classes = useStyles()
  const [description, setDescription] = useState(``)
  const [like, setLike] = useState(0)
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState("undefined")
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [type, setType] = useState([])
  const handleClick = async () => {
    handleLike()
    setLike(like + 1)
    setOpen(true)
  }

  async function handleLike() {
    if (db === "false") {
      return
    }
    const result = await axios.get(url + "/topics/like", {
      params: {
        id: location.pathname.substr(location.pathname.lastIndexOf("/") + 1),
        like: like,
      },
    })
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  let location = useLocation()

  async function getInfor() {
    if (db === "false") {
      setDescription(predescription)
      setLike(0)
      setUser(preUser)
      setDate(preDate)
      setTitle(preTitle)
      setType(preType)
      return
    } else {
      const result = await axios.get(url + "/topics/one", {
        params: {
          id: location.pathname.substr(location.pathname.lastIndexOf("/") + 1),
        },
      })
      setDescription(result.data.description)
      setLike(result.data.like)
      setUser(result.data.user)
      setDate(result.data.date)
      setTitle(result.data.title)
      setType(result.data.type)
    }
  }

  useEffect(() => {
    getInfor()
  }, [location.pathname])

  return (
    <div>
      <Card className={classes.root}>
        <div className={classes.title}>
          <Link className={classes.topicNavLink}>{title}</Link>
        </div>

        <CardHeader
          action={
            <div>
              <Grid container alignContent={"center"} xs={12}>
                <Button
                  variant="contained"
                  onClick={handleClick}
                  color="default"
                  startIcon={<ThumbUpAltIcon color={"primary"} />}
                >
                  {like}
                </Button>
              </Grid>
            </div>
          }
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {user.substring(0, 1)}
            </Avatar>
          }
          title={user}
          subheader={date.substring(0, 10)}
        />
        <div className={classes.subTitle}>
          {type.map((element, i) => (
            <Chip className={classes.label} key={i} label={element}></Chip>
          ))}
        </div>

        <Divider />
        <CardContent>
          <Typography
            color="textSecondary"
            component="div"
            className={classes.description}
          >
            <Box textAlign="justify" m={1}>
              <MarkDown data={description} />{" "}
            </Box>
          </Typography>
        </CardContent>
        <Divider />
      </Card>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert severity="success">Liked</Alert>
      </Snackbar>
    </div>
  )
}
