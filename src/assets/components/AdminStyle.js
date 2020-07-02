//can not delete
import { title } from "./Material-kit-react"

const workStyle = {
  section: {
    position: "relative",
    marginTop: "0px",
    padding: "30px",
    background: "white",
  },
  title: {
    ...title,
    margin: "0.5rem",
    fontSize: "30px",
    textDecoration: "none",
    textAlign: "center",
  },
  description: {
    color: "#999",
    textAlign: "center",
    marginLeft: "10px",
    marginRight: "10spx",
  },
  seachSection: {
    position: "relative",
    padding: "30px",
    marginLeft: "15%",
    background: "white",
  },
  navLink: {
    color: "#1890ff",
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
      color: "white",
      background: "rgba(200, 200, 200, 0.2)",
    },
  },
  typeHolder: {
    padding: "0.9375rem",
    margin: "3vh",
  },

  levelEasy: {
    color: "green",
    padding: "10px",
    margin: "10px",
  },
  levelMedium: {
    color: "blue",
    padding: "10px",
    margin: "10px",
  },
  levelHard: {
    color: "red",
    padding: "10px",
    margin: "10px",
  },
  type: {
    padding: "10px",
    margin: "10px",
  },
  horizontal: {
    width: "100%",
    display: "flex",
    overflowX: "scroll",
    scrollbarWidth: "none",
    padding: "15px",
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
  levelBorder: {
    padding: "15px",
    width: "100%",
    display: "flex",
    overflowX: "scroll",
    scrollbarWidth: "none",
  },
  levelRoot: {
    backgroundColor: "green",
  },
}

export default workStyle
