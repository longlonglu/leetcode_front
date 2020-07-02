const url =
  process.env.NODE_ENV === "production"
    ? "http://srv-captain--leetcode-back"
    : ""
export default url
