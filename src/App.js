import React from "react"
import Home from "./views/Home"
import Topics from "./views/Topics"
import Questions from "./views/Questions"
import { Route, Switch, Redirect } from "react-router-dom"
import Login from "./views/Login"
import AuthProvider, { useAuthContext } from "./AuthContext"
import Admin from "./views/Admin"

function App() {
  return (
    <div style={{ background: "#FFFFFF", height: "100%", width: "100%" }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/topics" component={Topics} />
        <Route path="/questions" component={Questions} />
        <AuthProvider>
          <PrivateRoute exact component={Admin} path="/admin" />
          <Route exact path="/login" component={Login} />
        </AuthProvider>
      </Switch>
    </div>
  )
}

function PrivateRoute({ component: Component, ...props }) {
  const { auth } = useAuthContext()
  return (
    <Route
      {...props}
      render={({ location }) =>
        auth ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default App
