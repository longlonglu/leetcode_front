import { red } from "@material-ui/core/colors"

const cardStyle = {
  root: {
    marginTop: "3%",
    padding: "15px",
    borderRadius: "16px",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginLeft: "9%",
    backgroundColor: "#e8fcf7",
    "&:hover,&:focus": {
      transition: "1s",
      backgroundColor: "#dff5f1",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: "#bbf2e8",
  },
  title: {
    display: "inline",
    lineHeight: "1.7",
    fontWeight: "400",
    fontSize: "30px",
    textAlign: "left",
    fontFamily: "Futura",
  },
  topicNavLink: {
    color: "black",
    paddingLeft: "0.937rem",
    textDecoration: "none",
    display: "inline-flex",
    "&:hover,&:focus": {
      transition: "1s",
      fontSize: "35px",
      color: "#d0d6d5",
    },
  },
  subTitle: {
    fontFamily: "Futura",
    paddingTop: "5px",
    width: "100%",
  },
  date: {
    fontFamily: "Futura",
    position: "relative",
    color: "black",
    background: "#fff",
  },
  label: {
    position: "relative",
    fontFamily: "Futura",
    backgroundColor: "#e8edec",
    padding: "10px",
    marginLeft: "5px",
  },
  description: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    color: "#8e9493",
  },
}

export default cardStyle
