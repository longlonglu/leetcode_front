import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"
import styles from "../../assets/components/WorkSectionStyle"
import theme from "../../assets/components/autoSuggestStyle"
import { Link, Route, useLocation } from "react-router-dom"
import AutoSuggest from "react-autosuggest"
import axios from "axios"
import Layout from "../../views/TopicsLayout"
import useInfiniteScroll from "../helper/useInfiniteScroll"
import Chip from "@material-ui/core/Chip"
import TopicCard from "../WorkSection/TopicsCard"
import url from "../helper/Url"

const useStyles = makeStyles(styles)
export default function QuestiosnWorkSection(props) {
  let location = useLocation()
  const [topics, setTopics] = useState("")
  const [suggest, setSuggest] = useState([])
  const [allTopics, setAllTopics] = useState([])
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
      : allTopics.filter((topics) =>
          topics.title.toLowerCase().includes(inputValue)
        )
  }
  useEffect(() => {
    axios
      .get(url + "/topics/")
      .then((response) => {
        setAllTopics(
          response.data.map((row) => ({
            title: row.title,
            _id: row._id,
            type: row.type,
            coverText: row.coverText,
            date: row.date,
            user: row.user,
          }))
        )
        setRenderItems(
          response.data.map((row) => ({
            title: row.title,
            _id: row._id,
            type: row.type,
            coverText: row.coverText,
            date: row.date,
            user: row.user,
          }))
        )
        setListItems(response.data.slice(0, 8))
        setCurrentIndex(7)
      })
      .catch((err) => {
        //error page
      })
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
              value: topics,
              onChange: (_event, { newValue }) => {
                setTopics(newValue)
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
                  to={`topics/${element._id}`}
                  className={classes.navLink}
                  onClick={() => {
                    setHide(true)
                  }}
                >
                  {element.title}
                </Link>

                {element.type.map((e, i) => (
                  <Chip
                    style={{ color: "black" }}
                    className={classes.type}
                    key={i}
                    label={e}
                  ></Chip>
                ))}
                <Divider />
              </Grid>
            )}
          />
        </Grid>
      </div>
      <Divider />

      <div className={classes.section}>
        <Route path={`/topics/:topicsId`} component={Layout} />
        {!hide && (
          <Grid>
            {listItems.map((element) => (
              <TopicCard
                key={element._id}
                date={element.date}
                coverText={element.coverText}
                type={element.type}
                _id={element._id}
                title={element.title}
                user={element.user}
                {...props}
              />
            ))}
            {isFetching && "Fetching more list items..."}
          </Grid>
        )}
      </div>
    </>
  )
}
