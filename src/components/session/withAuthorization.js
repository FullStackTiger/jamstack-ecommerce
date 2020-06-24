import React from "react"
import { navigate } from "gatsby"

import AuthUserContext from "./context"
import { withFirebase } from "../Firebase"
import SignIn from "../formComponents/SignIn"
import SignUp from "../formComponents/SignUp"

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    _initFirebase = false
    state = { formState: "signIn" }

    firebaseInit = () => {
      if (this.props.firebase && !this._initFirebase) {
        this._initFirebase = true

        this.listener = this.props.firebase.onAuthUserListener(
          authUser => {
            if (!condition(authUser)) {
              navigate("/admin")
            }
          },
          () => navigate("/admin")
        )
      }
    }

    componentDidMount() {
      this.firebaseInit()
    }

    componentDidUpdate() {
      this.firebaseInit()
    }

    componentWillUnmount() {
      this.listener && this.listener()
    }

    switchForm = formState => this.setState({ formState })

    render() {
      const { formState } = this.state
      let FromComponent = React.Fragment
      switch (formState) {
        case "signIn":
          FromComponent = SignIn
          break
        case "signUp":
          FromComponent = SignUp
          break
        default:
          break
      }

      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? (
              <Component {...this.props} />
            ) : (
              <FromComponent
                toggleFormState={this.switchForm}
                firebase={this.props.firebase}
              />
            )
          }
        </AuthUserContext.Consumer>
      )
    }
  }

  return withFirebase(WithAuthorization)
}

export default withAuthorization
