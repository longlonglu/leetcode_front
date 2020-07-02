import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"
import styles from "../../assets/components/WorkSectionStyle"
import theme from "../../assets/components/autoSuggestStyle"
import { Link, Route } from "react-router-dom"
import { Button } from "@material-ui/core"
import AutoSuggest from "react-autosuggest"
import axios from "axios"
import Layout from "../../views/QuestionsLayout"
import useInfiniteScroll from "../helper/useInfiniteScroll"
import Chip from "@material-ui/core/Chip"
import url from "../helper/Url"

const useStyles = makeStyles(styles)
export default function QuestiosnWorkSection(props) {
  const [questions, setquestions] = useState("")
  const [suggest, setSuggest] = useState([])
  const [allquestions, setAllquestions] = useState([])
  const [type, setType] = useState([
    "Easy",
    "Medium",
    "Hard",
    "Array",
    "Dynamic Programming",
    "Tree",
    "Depth-First-Search",
    "Hash Table",
    "Stack",
    "Two Pointer",
    "Linked List",
    "Heap",
    "BackTracking",
    "Sliding Window",
    "Divide and Conquer",
    "Math",
  ])
  const { hide, setHide } = props.state
  const classes = useStyles()

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems)
  const [listItems, setListItems] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const getSuggestions = (value) => {
    const inputValue = value.value.toLowerCase()
    const inputLength = inputValue.length
    return inputLength === 0
      ? []
      : allquestions.filter((questions) =>
          questions.title.toLowerCase().includes(inputValue)
        )
  }
  useEffect(() => {
    setquestions("")
    setHide(false)
    axios
      .get(url + "/questions/")
      .then((response) => {
        setAllquestions(
          response.data.map((row) => ({
            title: row.title,
            _id: row._id,
            type: row.type,
            level: row.level,
          }))
        )
        setRenderItems(
          response.data.map((row) => ({
            title: row.title,
            _id: row._id,
            type: row.type,
            level: row.level,
          }))
        )
        setListItems(response.data.slice(0, 20))
        setCurrentIndex(19)
      })
      .catch((err) => {})
  }, [])

  const [renderItems, setRenderItems] = useState()
  function fetchMoreListItems() {
    if (currentIndex >= renderItems.length - 1) {
      setIsFetching(false)
      return
    }

    let temp = renderItems.slice(
      currentIndex + 1,
      Math.min(currentIndex + 10, renderItems.length)
    )
    setCurrentIndex(Math.min(currentIndex + 9, renderItems.length - 1))
    setTimeout(() => {
      setListItems((prevState) => [...prevState, ...temp])
      setIsFetching(false)
    }, 500)
  }

  const handleClick = (e) => {
    const t = e.target.innerText
    if (t === "Easy" || t === "Medium" || t === "Hard") {
      const arr = allquestions.filter((question) => question.level === t)
      setRenderItems(arr)
      setListItems(arr.slice(0, 10))
      setCurrentIndex(9)

      return
    }
    const arr = allquestions.filter((question) => question.type.includes(t))
    setRenderItems(arr)
    setListItems(arr.slice(0, 10))
    setCurrentIndex(9)
  }

  return (
    <>
      <div className={classes.seachSection}>
        <Grid className={classes.autoSuggestion}>
          <AutoSuggest
            theme={theme}
            inputProps={{
              placeholder: "Search For Key Word...",
              autoComplete: "abcd",
              name: "questions",
              id: "questions",
              value: questions,
              onChange: (_event, { newValue }) => {
                setquestions(newValue)
              },
            }}
            suggestions={suggest}
            onSuggestionsFetchRequested={(value) => {
              setSuggest(getSuggestions(value))
            }}
            onSuggestionsClearRequested={() => {
              setSuggest([])
            }}
            getSuggestionValue={(value) => value.title}
            renderSuggestion={(element) => (
              <Grid className={classes.horizontal}>
                <Link
                  to={`questions/${element._id}`}
                  className={classes.navLink}
                  onClick={() => {
                    setHide(true)
                  }}
                >
                  {element.title}
                </Link>
                {element.level === "Easy" && (
                  <Chip
                    className={classes.levelEasy}
                    label={element.level}
                  ></Chip>
                )}
                {element.level === "Medium" && (
                  <Chip
                    className={classes.levelMedium}
                    label={element.level}
                  ></Chip>
                )}
                {element.level === "Hard" && (
                  <Chip
                    className={classes.levelHard}
                    label={element.level}
                  ></Chip>
                )}

                {element.type.map((e) => (
                  <Chip className={classes.type} label={e}></Chip>
                ))}
                <Divider />
              </Grid>
            )}
          />
        </Grid>
      </div>
      {!hide && (
        <div>
          <div className={classes.horizontal}>
            {type.map((e) => (
              <Chip
                className={classes.type}
                label={e}
                onClick={(e) => {
                  handleClick(e)
                }}
              ></Chip>
            ))}
          </div>
        </div>
      )}
      <Divider />
      <div className={classes.section}>
        <Route path={`/questions/:questionsId`} component={Layout} />
        {!hide && (
          <Grid container xs={12}>
            {listItems.map((element) => (
              <>
                <Grid container>
                  <Grid xs={6}>
                    <Link
                      to={`questions/${element._id}`}
                      className={classes.navLink}
                      onClick={() => {
                        setHide(true)
                      }}
                    >
                      {element.title}
                    </Link>
                  </Grid>

                  <Grid xs={6} container alignItems={"center"}>
                    <div className={classes.horizontal}>
                      {element.level === "Easy" && (
                        <Chip
                          className={classes.levelEasy}
                          label={element.level}
                          onClick={(e) => {
                            handleClick(e)
                          }}
                        ></Chip>
                      )}
                      {element.level === "Medium" && (
                        <Chip
                          className={classes.levelMedium}
                          label={element.level}
                          onClick={(e) => {
                            handleClick(e)
                          }}
                        ></Chip>
                      )}
                      {element.level === "Hard" && (
                        <Chip
                          className={classes.levelHard}
                          label={element.level}
                          onClick={(e) => {
                            handleClick(e)
                          }}
                        ></Chip>
                      )}

                      {element.type.map((e) => (
                        <Chip
                          className={classes.type}
                          label={e}
                          onClick={(e) => {
                            handleClick(e)
                          }}
                        ></Chip>
                      ))}
                    </div>
                  </Grid>
                </Grid>

                <Divider />
              </>
            ))}
            {isFetching && "Fetching more list items..."}
          </Grid>
        )}
      </div>
    </>
  )
}
