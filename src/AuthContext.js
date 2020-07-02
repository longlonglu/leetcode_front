import React, { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"
import url from "./components/helper/Url"

const AuthContext = createContext(null)

function AuthProvider(props) {
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const local = localStorage.getItem("user")
    if (local) {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }, [])
  const setLocalStorage = (data) => {
    const userData = {
      ...data,
    }

    localStorage.setItem("user", data)
    setAuth(userData)
  }

  const login = (username, password) => {
    axios
      .post(url + "/auth/login", { username, password })
      .then((response) => {
        setLocalStorage(response.data)
        setAuth(true)
      })
      .catch((err) => {
        window.location.reload()
      })
  }
  const logout = () => {
    axios.post(url + "/auth/logout").then((response) => {
      localStorage.clear()
      setAuth(false)
    })
  }

  const authAPI = { auth, login, logout }

  return <AuthContext.Provider value={authAPI} {...props} />
}

const useAuthContext = () => useContext(AuthContext)

export { AuthProvider as default, useAuthContext }
