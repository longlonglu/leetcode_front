import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Divider, Box } from "@material-ui/core"
import styles from "../../assets/components/CardStyle"
import { Link } from "react-router-dom"
import Avatar from "@material-ui/core/Avatar"
import Chip from "@material-ui/core/Chip"
import CardHeader from "@material-ui/core/CardHeader"

const useStyles = makeStyles(styles)
export default function RecipeReviewCard(props) {
  const classes = useStyles()

  const { setHide } = props.state

  var date = String(props.date).substring(0, 10)
  var user = String(props.user).substring(0, 1)

  return (
    <Card className={classes.root}>
      <div className={classes.title}>
        {props._id ? (
          <Link
            to={`topics/${props._id}`}
            className={classes.topicNavLink}
            onClick={() => setHide(true)}
          >
            {props.title}
          </Link>
        ) : (
          <Link className={classes.topicNavLink}>{props.title}</Link>
        )}
      </div>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {user}
          </Avatar>
        }
        title={props.user}
        subheader={date}
      />
      <Divider />
      <CardContent>
        <Typography
          color="textSecondary"
          component="div"
          className={classes.description}
        >
          <Box textAlign="justify" m={1}>
            {props.coverText}
          </Box>
        </Typography>
      </CardContent>
      <Divider />
      <div className={classes.subTitle}>
        {props.type.map((element) => (
          <Chip className={classes.label} label={element}></Chip>
        ))}
      </div>
    </Card>
  )
}
