import React, { useState, useEffect } from "react"
import { Button, Divider, Paper, ButtonGroup } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import List from "@material-ui/core/List"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Grid from "@material-ui/core/Grid"
import AutoSuggest from "react-autosuggest"
import Chip from "@material-ui/core/Chip"
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
import Layout from "./TopicsLayout"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import DeleteIcon from "@material-ui/icons/Delete"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import DoneIcon from "@material-ui/icons/Done"
import url from "../components/helper/Url"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
const useStyles = makeStyles(styles)
export default function AdminTopics(props) {
  const classes = useStyles()
  const userName = props.userName
  const [tabValue, setTabValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className={classes.section}>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        indicatorColor={"secondary"}
        textColor={"secondary"}
      >
        <Tab label="Edit Question" className={classes.description} />
        <Tab label="Upload Question" className={classes.description} />
      </Tabs>
      {tabValue === 0 && <Edit userName={userName} />}
      {tabValue === 1 && <Upload userName={userName} />}
    </div>
  )
}

/* -----------------------------------------------------------------------------------------------------------------------*/

function Edit(props) {
  /* Styles----------------------------------------------------------------------------------------------------------------*/
  const classes = useStyles()
  const [hide, setHide] = useState(false)
  /* Styles----------------------------------------------------------------------------------------------------------------*/

  /* Display States----------------------------------------------------------------------------------------------------------------*/
  const userName = props.userName
  const [title, setTitle] = useState("")
  const [type, setType] = useState(["nothing", "nothing"])
  const [description, setDescription] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [level, setLevel] = useState(" ")
  /* Display States----------------------------------------------------------------------------------------------------------------*/

  /* Auto Suggestion----------------------------------------------------------------------------------------------------------------*/
  const [questions, setQuestions] = useState("")
  const [suggest, setSuggest] = useState([])
  const [allQuestion, setAllQuestion] = useState([])
  const getSuggestions = (value) => {
    const inputValue = value.value.toLowerCase()
    const inputLength = inputValue.length
    return inputLength === 0
      ? []
      : allQuestion.filter((question) =>
          question.title.toLowerCase().includes(inputValue)
        )
  }
  /* Auto Suggestion----------------------------------------------------------------------------------------------------------------*/

  /* Dialog Open/Close----------------------------------------------------------------------------------------------------------------*/
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  /* Dialog Open/Close----------------------------------------------------------------------------------------------------------------*/

  /* Preview Open/Close----------------------------------------------------------------------------------------------------------------*/
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handlePreview = async (e) => {
    setOpen(true)
  }
  /* Preview Open/Close----------------------------------------------------------------------------------------------------------------*/

  /* Delete Button----------------------------------------------------------------------------------------------------------------*/
  const handleDelete = async (e) => {
    const result = await axios.get(url + "/questions/delete", {
      params: {
        id: currentQuestion,
      },
    })
    console.log(result)
    if (result) {
      setDeleteDialogOpen(false)
      setHide(true)
    } else {
      setDeleteDialogOpen(true)
    }
  }
  /* Delete Button----------------------------------------------------------------------------------------------------------------*/

  /* Update Button----------------------------------------------------------------------------------------------------------------*/
  const handleUpdate = async (e) => {
    const result = await axios.get(url + "/questions/update", {
      params: {
        id: currentQuestion,
        title: title,
        description: description,
        level: level,
        type: type,
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
  /* Update Button----------------------------------------------------------------------------------------------------------------*/

  /* Type Button----------------------------------------------------------------------------------------------------------------*/
  const [predefinedtType, setPredefinedType] = useState([
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
  const removeType = (i) => {
    const newTags = [...type]
    const temp = newTags.splice(i, 1)
    setType(newTags)
    setPredefinedType((previous) => [...previous, temp])
  }
  const addType = (element) => {
    const newTags = [...predefinedtType]
    newTags.splice(newTags.indexOf(element), 1)
    setPredefinedType(newTags)
    setType((previous) => [...previous, element])
  }
  /* Type Button----------------------------------------------------------------------------------------------------------------*/

  /* Click AutoSuggestion Button----------------------------------------------------------------------------------------------------------------*/
  const handleClick = (topicId) => {
    setCurrentQuestion(topicId)
    const result = axios
      .get(url + "/questions/one", {
        params: {
          id: topicId,
        },
      })
      .then((response) => {
        setDescription(response.data.description)
        setTitle(response.data.title)
        setType(response.data.type)
        setLevel(response.data.level)
        setHide(false)
      })
  }
  /* Click AutoSuggestion Button----------------------------------------------------------------------------------------------------------------*/

  useEffect(() => {
    setHide(true)
    axios
      .get(url + "/questions/")
      .then((response) => {
        setAllQuestion(
          response.data.map((row) => ({
            title: row.title,
            _id: row._id,
            type: row.type,
            date: row.date,
            user: row.user,
          }))
        )
      })
      .catch((err) => {})
    setOpen(false)
  }, [])

  const handleChangeLevel = (event) => {
    setLevel(event.target.value)
    console.log(level)
  }

  /* ---------------------------------------------------------------------------------------------------------------------------*/

  return (
    <div className={classes.section}>
      {/* Auto Suggestion---------------------------------------------------------------------------------------------------------------------------*/}
      <div className={classes.seachSection}>
        <AutoSuggest
          theme={theme}
          inputProps={{
            placeholder: "Search For Key Word...",
            autoComplete: "abcd",
            name: "topics",
            id: "topics",
            value: questions,
            onChange: (_event, { newValue }) => {
              setQuestions(newValue)
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
      {/* Auto Suggestion---------------------------------------------------------------------------------------------------------------------------*/}

      {!hide && (
        <>
          {/* Preview---------------------------------------------------------------------------------------------------------------------------*/}

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
                color={"primary"}
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
          {/* Preview---------------------------------------------------------------------------------------------------------------------------*/}

          {/* Update---------------------------------------------------------------------------------------------------------------------------*/}

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
          {/* Update---------------------------------------------------------------------------------------------------------------------------*/}

          {/* Delete---------------------------------------------------------------------------------------------------------------------------*/}

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
                color="primary"
                autoFocus
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          {/* Delete---------------------------------------------------------------------------------------------------------------------------*/}

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

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Level
            </InputLabel>
            <Select
              autoWidth={true}
              defaultValue={level}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={level}
              onChange={handleChangeLevel}
              label="Level"
            >
              <MenuItem value={"Easy"}>Easy</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Hard"}>Hard</MenuItem>
            </Select>
          </FormControl>

          <Paper className={classes.typeHolder}>
            {type.map((element, i) => (
              <Chip
                className={classes.label}
                label={element}
                color="primary"
                onDelete={() => {
                  removeType(i)
                }}
              ></Chip>
            ))}
            <div className={classes.horizontal}>
              {predefinedtType.map((element, i) => (
                <Chip
                  className={classes.label}
                  label={element}
                  clickable
                  deleteIcon={<DoneIcon />}
                  onDelete={() => {
                    addType(element)
                  }}
                ></Chip>
              ))}
            </div>
          </Paper>

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
        </>
      )}
    </div>
  )
}

{
  /* -----------------------------------------------------------------------------------------------------------------------*/
}

function Upload(props) {
  /* Styles----------------------------------------------------------------------------------------------------------------*/
  const classes = useStyles()
  const [hide, setHide] = useState(false)
  /* Styles----------------------------------------------------------------------------------------------------------------*/

  /* Display States----------------------------------------------------------------------------------------------------------------*/
  const userName = props.userName
  const [title, setTitle] = useState("")
  const [type, setType] = useState(["nothing", "nothing"])
  const [description, setDescription] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [level, setLevel] = useState(" ")
  /* Display States----------------------------------------------------------------------------------------------------------------*/

  /* Dialog Open/Close----------------------------------------------------------------------------------------------------------------*/
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  /* Dialog Open/Close----------------------------------------------------------------------------------------------------------------*/

  /* Preview Open/Close----------------------------------------------------------------------------------------------------------------*/
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handlePreview = async (e) => {
    setOpen(true)
  }
  /* Preview Open/Close----------------------------------------------------------------------------------------------------------------*/

  /* Update Button----------------------------------------------------------------------------------------------------------------*/
  const handleUpdate = async (e) => {
    const result = await axios.get(url + "/questions/save", {
      params: {
        id: currentQuestion,
        title: title,
        description: description,
        level: level,
        type: type,
        user: userName,
      },
    })
    if (result) {
      setDialogOpen(false)
      window.location.reload()
    } else {
      setDialogOpen(true)
    }
  }
  /* Update Button----------------------------------------------------------------------------------------------------------------*/

  /* Type Button----------------------------------------------------------------------------------------------------------------*/
  const [predefinedtType, setPredefinedType] = useState([
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
  const removeType = (i) => {
    const newTags = [...type]
    const temp = newTags.splice(i, 1)
    setType(newTags)
    setPredefinedType((previous) => [...previous, temp])
  }
  const addType = (element) => {
    const newTags = [...predefinedtType]
    newTags.splice(newTags.indexOf(element), 1)
    setPredefinedType(newTags)
    setType((previous) => [...previous, element])
  }
  /* Type Button----------------------------------------------------------------------------------------------------------------*/

  const handleChangeLevel = (event) => {
    setLevel(event.target.value)
  }

  /* ---------------------------------------------------------------------------------------------------------------------------*/

  return (
    <div className={classes.section}>
      {!hide && (
        <>
          {/* Preview---------------------------------------------------------------------------------------------------------------------------*/}
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) => {
              handlePreview(e)
            }}
          >
            Preview
          </Button>
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
          {/* Preview---------------------------------------------------------------------------------------------------------------------------*/}

          {/* Update---------------------------------------------------------------------------------------------------------------------------*/}
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
                autoFocus
                startIcon={<CloudUploadIcon />}
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
          {/* Update---------------------------------------------------------------------------------------------------------------------------*/}

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

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Level
            </InputLabel>
            <Select
              autoWidth={true}
              defaultValue={level}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={level}
              onChange={handleChangeLevel}
              label="Level"
            >
              <MenuItem value={"Easy"}>Easy</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Hard"}>Hard</MenuItem>
            </Select>
          </FormControl>

          <Paper className={classes.typeHolder}>
            <div className={classes.horizontal}>
              {type.map((element, i) => (
                <Chip
                  className={classes.label}
                  label={element}
                  onDelete={() => {
                    removeType(i)
                  }}
                ></Chip>
              ))}
            </div>
            <Divider />

            <div className={classes.horizontal}>
              {predefinedtType.map((element, i) => (
                <Chip
                  className={classes.label}
                  label={element}
                  clickable
                  deleteIcon={<DoneIcon />}
                  onDelete={() => {
                    addType(element)
                  }}
                ></Chip>
              ))}
            </div>
          </Paper>

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
        </>
      )}
    </div>
  )
}

{
  /* -----------------------------------------------------------------------------------------------------------------------*/
}
