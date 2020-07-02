//can not delete
import { title } from "./Material-kit-react"

const workStyle = {
  section: {
    position: "relative",
    marginTop: "0px",
    padding: "30px",
    background: "#FFFFFF",
  },
  seachSection: {
    position: "relative",
    marginTop: "20vh",
    padding: "30px",
    background: "#FFFFFF",
  },
  title: {
    ...title,
    marginBottom: "20px",
    marginTop: "70px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "center",
  },
  description: {
    color: "#999",
    textAlign: "center",
    marginLeft: "10px",
    marginRight: "10px",
  },

  descriptionLeft: {
    color: "#fff",
    textAlign: "left",
    marginLeft: "10px",
    marginRight: "10px",
  },
  textCenter: {
    textAlign: "center",
  },
  textArea: {
    marginRight: "10px",
    marginLeft: "10px",
  },
  navLink: {
    color: "black",
    width: "80%",
    position: "relative",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "14px",
    textTransform: "uppercase",
    borderRadius: "3px",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    "&:hover,&:focus": {
      color: "#1890ff",
    },
  },
  topicNavLink: {
    color: "#1890ff",
    width: "100%",
    position: "relative",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "14px",
    textTransform: "uppercase",
    borderRadius: "3px",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    "&:hover,&:focus": {
      color: "white",
      background: "rgba(200, 200, 200, 0.2)",
    },
  },
  levelEasy: {
    color: "green",
    backgroundColor: "#e8edec",
    padding: "10px",
    margin: "10px",
    fontFamily: "Futura",
  },
  levelMedium: {
    backgroundColor: "#e8edec",
    color: "blue",
    padding: "10px",
    margin: "10px",
    fontFamily: "Futura",
  },
  levelHard: {
    backgroundColor: "#e8edec",
    color: "red",
    padding: "10px",
    margin: "10px",
    fontFamily: "Futura",
  },
  type: {
    backgroundColor: "#e8edec",
    padding: "10px",
    margin: "10px",
    fontFamily: "Futura",
  },
  horizontal: {
    width: "100%",
    display: "flex",
    overflowX: "scroll",
    scrollbarWidth: "none",
  },
  autoSuggestion: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  likeButton: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
}

export default workStyle
