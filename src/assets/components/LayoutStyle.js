import { red } from "@material-ui/core/colors"
const layoutStyle = {
  root: {
    borderRadius: "12px",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#e8fcf7",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[300],
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
    fontSize: "30px",
    display: "inline-flex",
    "&:hover,&:focus": {
      transition: "1s",
      color: "#d0d6d5",
    },
  },
  subTitle: {
    paddingTop: "5px",
    width: "100%",
  },
  subTitle: {
    fontFamily: "Futura",
    paddingTop: "5px",
    width: "100%",
  },
  label: {
    position: "relative",
    fontFamily: "Futura",
    backgroundColor: "#e8edec",
    padding: "10px",
    margin: "5px",
    marginLeft: "10px",
  },
}

export default layoutStyle
