import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import styles from "../../assets/components/ParallaxStyle"

const useStyles = makeStyles(styles)

export default function Parallax(props) {
  let windowScrollTop
  if (window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3
  } else {
    windowScrollTop = 0
  }
  const [transform, setTransform] = React.useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  )
  React.useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform)
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform)
      }
    }
  })
  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3
    setTransform("translate3d(0," + windowScrollTop + "px,0)")
  }
  const { image } = props
  const classes = useStyles()
  return (
    <div
      className={classes.parallax}
      style={{
        backgroundImage: `url(${image})`,
        transform: transform,
      }}
    ></div>
  )
}
