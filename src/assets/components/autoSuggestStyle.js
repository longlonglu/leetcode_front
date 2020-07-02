const theme = {
  container: {
    position: "relative",
    width: "80%",
  },
  input: {
    borderRadius: "16px",
    textAlign: "center",
    height: 30,
    width: "100%",
    padding: "10px 10px",
    fontFamily: "Helvetica, sans-serif",
    fontWeight: 300,
    fontSize: 14,
    border: "1px solid #aaa",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  inputFocused: {
    outline: "none",
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  suggestionsContainer: {
    display: "none",
  },
  suggestionsContainerOpen: {
    overflow: "auto",
    padding: "10px 10px",
    height: "70vh",
    display: "block",
    position: "absolute",
    top: 51,
    width: "100%",
    border: "1px solid #aaa",
    backgroundColor: "#fff",
    fontFamily: "Helvetica, sans-serif",
    fontWeight: 300,
    fontSize: 14,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2,
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  suggestion: {
    cursor: "pointer",
    padding: "10px",
  },
}

export default theme
