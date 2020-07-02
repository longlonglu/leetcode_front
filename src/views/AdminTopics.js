import React, { useState, useEffect } from "react"
import { Button, Divider, Paper, ButtonGroup } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import List from "@material-ui/core/List"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Grid from "@material-ui/core/Grid"
import AutoSuggest from "react-autosuggest"
import Chip from "@material-ui/core/Chip"
import { Redirect } from "react-router-dom"
import axios from "axios"
import styles from "../assets/components/AdminStyle"
import { makeStyles } from "@material-ui/core/styles"
import theme from "../assets/components/autoSuggestStyle"
import Dialog from "@material-ui/core/Dialog"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Slide from "@material-ui/core/Slide"
import TopicsCard from "../components/WorkSection/TopicsCard"
import Layout from "./TopicsLayout"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import style from "../assets/components/AdminStyle"
import DeleteIcon from "@material-ui/icons/Delete"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import url from "../components/helper/Url"

const useStyles = makeStyles(style)
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
export default function AdminTopics(props) {
  const classes = useStyles()
  const userName = props.userName
  const [tabValue, setTabValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className={classes.section}>
      <Paper elevation={3}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor={"secondary"}
          textColor={"secondary"}
        >
          <Tab label="Edit Topic" className={classes.description} />
          <Tab label="Upload Topic" className={classes.description} />
        </Tabs>
      </Paper>

      {tabValue === 0 && <Edit userName={userName} />}
      {tabValue === 1 && <Upload userName={userName} />}
    </div>
  )
}

function Edit(props) {
  const classes = useStyles()
  const [hide, setHide] = useState(false)
  const userName = props.userName
  const [topics, setTopics] = useState("")
  const [suggest, setSuggest] = useState([])
  const [allTopics, setAllTopics] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const getSuggestions = (value) => {
    const inputValue = value.value.toLowerCase()
    const inputLength = inputValue.length
    return inputLength === 0
      ? []
      : allTopics.filter((topics) =>
          topics.title.toLowerCase().includes(inputValue)
        )
  }
  const [title, setTitle] = useState("")
  const [coverText, setCoverText] = useState("")
  const [type, setType] = useState(["nothing", "nothing"])
  const [description, setDescription] = useState("")
  const [currentTopic, setCurrentTopic] = useState("")
  useEffect(() => {
    setHide(true)
    axios
      .get("/topics/")
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
      })
      .catch((err) => {})
    setOpen(false)
  }, [])

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleDelete = async (e) => {
    const result = await axios.get(url + "/topics/delete", {
      params: {
        id: currentTopic,
      },
    })
    if (result) {
      setDeleteDialogOpen(false)
      setHide(true)
    } else {
      setDeleteDialogOpen(true)
    }
  }

  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handlePreview = async (e) => {
    setOpen(true)
  }

  const handleUpdate = async (e) => {
    const result = await axios.get(url + "/topics/update", {
      params: {
        id: currentTopic,
        title: title,
        description: description,
        type: type,
        coverText: coverText,
        user: userName,
      },
    })
    if (result) {
      setDialogOpen(false)
      setHide(true)
    } else {
      setDialogOpen(true)
    }
  }

  const handleClick = (topicId) => {
    // const topicId = e.target.parentNode.id
    setCurrentTopic(topicId)
    const result = axios
      .get(url + "/topics/one", {
        params: {
          id: topicId,
        },
      })
      .then((response) => {
        setDescription(response.data.description)
        setTitle(response.data.title)
        setType(response.data.type)
        setCoverText(response.data.coverText)
        setHide(false)
      })
      .catch((err) => {
        return <Redirect to="/login"></Redirect>
      })
  }

  const [input, setInput] = useState("")
  const removeType = (i) => {
    const newTags = [...type]
    newTags.splice(i, 1)
    setType(newTags)
  }
  const addType = () => {
    if (input.length === 0) {
      return
    }
    setType((previous) => [...previous, input])
    setInput("")
  }

  return (
    <div className={classes.section}>
      <div className={classes.seachSection}>
        <AutoSuggest
          theme={theme}
          inputProps={{
            placeholder: "Search To Edit A Topic",
            autoComplete: "abcd",
            name: "topics",
            id: "topics",
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
              <Button
                className={classes.navLink}
                id={element._id}
                onClick={() => {
                  handleClick(element._id)
                }}
              >
                {element.title}
              </Button>

              <Chip
                className={classes.type}
                label={element.date.substring(0, 10)}
              ></Chip>
              <Chip className={classes.type} label={element.user}></Chip>

              <Divider />
            </Grid>
          )}
        />
      </div>

      {!hide && (
        <div className={classes.section}>
          {/* /////////////////////////////////////////////////////// */}
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <AppBar>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <List>
              <TopicsCard
                title={title}
                coverText={coverText}
                user={userName}
                type={type}
                date={"2020-01-01"}
                state={"nothing"}
              />
              <Divider />

              <Layout
                db={"false"}
                preUser={userName}
                preDate={"2020-01-01"}
                preTitle={title}
                preType={type}
                predescription={description}
              />
            </List>
          </Dialog>
          {/* /////////////////////////////////////////////////////// */}

          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ButtonGroup aria-label="outlined primary button group">
              <Button
                variant="outlined"
                color="primary"
                onClick={(e) => {
                  handlePreview(e)
                }}
              >
                Preview
              </Button>
              <Button
                variant={"contained"}
                color={"primary"}
                startIcon={<CloudUploadIcon />}
                onClick={(e) => {
                  setDialogOpen(true)
                }}
              >
                Update
              </Button>
              <Button
                variant={"contained"}
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={(e) => {
                  setDeleteDialogOpen(true)
                }}
              >
                Delete
              </Button>
            </ButtonGroup>
          </div>
          <Dialog
            open={dialogOpen}
            onClose={() => {
              setDialogOpen(false)
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are You Sure You Want To Change?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This is a random sentence
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={(e) => handleUpdate(e)}
                color="primary"
                startIcon={<CloudUploadIcon />}
                autoFocus
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={deleteDialogOpen}
            onClose={() => {
              setDeleteDialogOpen(false)
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are You Sure You Want To Delete?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This is a random sentence
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={(e) => handleDelete(e)}
                color="secondary"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Title"
            name="title"
            multiline
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            label="Cover Text"
            name="coverText"
            rowsMax={10}
            value={coverText}
            autoFocus
            onChange={(e) => setCoverText(e.target.value)}
          />

          <Paper elevation={5} className={classes.typeHolder}>
            {type.map((element, i) => (
              <Chip
                className={classes.label}
                label={element}
                onDelete={() => {
                  removeType(i)
                }}
              ></Chip>
            ))}
          </Paper>

          <TextField
            variant="outlined"
            margin="normal"
            required
            label="Type"
            value={input}
            autoFocus
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={(e) => {
              addType(e)
            }}
          >
            add tag
          </Button>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            label="Description"
            name="description"
            value={description}
            autoFocus
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      )}
    </div>
  )
}

{
  /* ------------------------------------------------------------------------------------------- */
}

function Upload(props) {
  const classes = useStyles()
  const userName = props.userName
  const [dialogOpen, setDialogOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [coverText, setCoverText] = useState("")
  const [type, setType] = useState([])
  const [description, setDescription] = useState("")

  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handlePreview = (e) => {
    setOpen(true)
  }

  const [input, setInput] = useState("")
  const removeType = (i) => {
    const newTags = [...type]
    newTags.splice(i, 1)
    setType(newTags)
  }

  const addType = () => {
    if (input.length === 0) {
      return
    }
    setType((previous) => [...previous, input])
    setInput("")
  }

  const handleUpload = async () => {
    if (title === "") {
      return
    }
    const result = await axios.get(url + "/topics/save", {
      params: {
        title: title,
        description: description,
        type: type,
        coverText: coverText,
        user: userName,
      },
    })
    if (result.data.message === "success") {
      setDialogOpen(false)
      setOpen(false)
      window.location.reload()
    } else {
      setDialogOpen(true)
    }
  }

  return (
    <>
      <div className={classes.section}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ButtonGroup aria-label="outlined primary button group">
            <Button
              variant="outlined"
              color="primary"
              onClick={(e) => {
                handlePreview(e)
              }}
            >
              Preview
            </Button>

            <Button
              variant={"contained"}
              color={"primary"}
              startIcon={<CloudUploadIcon />}
              onClick={() => {
                setDialogOpen(true)
              }}
            >
              Upload
            </Button>
          </ButtonGroup>
        </div>

        {/* /////////////////////////////////////////////////////// */}
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <List>
            <TopicsCard
              title={title}
              coverText={coverText}
              user={userName}
              type={type}
              date={"2020-01-01"}
              state={"nothing"}
            />
            <Divider />

            <Layout
              db={"false"}
              preUser={userName}
              preDate={"2020-01-01"}
              preTitle={title}
              preType={type}
              predescription={description}
            />
          </List>
        </Dialog>

        <Dialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false)
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are You Sure You Want To Upload?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This is a random sentence
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleUpload()
              }}
              color="primary"
              autoFocus
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </DialogActions>
        </Dialog>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Title"
          name="title"
          multiline
          value={title}
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline
          label="Cover Text"
          name="coverText"
          rowsMax={10}
          value={coverText}
          autoFocus
          onChange={(e) => setCoverText(e.target.value)}
        />

        <Paper elevation={5} className={classes.typeHolder}>
          {type.map((element, i) => (
            <Chip
              className={classes.label}
              label={element}
              onDelete={() => {
                removeType(i)
              }}
            ></Chip>
          ))}
        </Paper>

        <TextField
          variant="outlined"
          margin="normal"
          required
          label="Type"
          value={input}
          autoFocus
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={(e) => {
            addType(e)
          }}
        >
          add tag
        </Button>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline
          label="Description"
          name="description"
          value={description}
          autoFocus
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </>
  )
}
