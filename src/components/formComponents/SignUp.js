import React from "react"

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  error: null,
  validErrors: {
    username: "",
    email: "",
    password: "",
  },
}

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
)

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use"

const ERROR_MSG_ACCOUNT_EXISTS =
  "An account with this E-Mail address already exists."

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({ error: null })
    let errors = this.state.validErrors

    switch (name) {
      case "username":
        errors.username =
          value.length < 5 ? "User Name must be 5 characters long!" : ""
        break
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!"
        break
      case "password":
        errors.password =
          value.length < 6 ? "Password must be 6 characters long!" : ""
        break
      default:
        break
    }
    this.setState({ errors, [name]: value })
  }

  signUp = e => {
    const { username, email, password } = this.state
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
        })
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }
        this.setState({ error })
      })

    e.preventDefault()
  }
  render() {
    const { username, email, password, error, validErrors } = this.state
    const isInvalid =
      password === "" ||
      email === "" ||
      username === "" ||
      validErrors.email !== "" ||
      validErrors.username !== "" ||
      validErrors.password !== ""

    return (
      <div>
        <h3>Sign Up</h3>
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-144">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  onChange={this.onChange}
                  name="username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
                {validErrors.username.length > 0 && (
                  <p class="text-red-500 text-xs italic">
                    {validErrors.username}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  onChange={this.onChange}
                  name="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  placeholder="Email address"
                />
                {validErrors.email.length > 0 && (
                  <p class="text-red-500 text-xs italic">{validErrors.email}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  onChange={this.onChange}
                  name="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
                {validErrors.password.length > 0 && (
                  <p class="text-red-500 text-xs italic">
                    {validErrors.password}
                  </p>
                )}
              </div>
              {error && <p class="text-red-500 text-xs italic">{error.message}</p>}
              <div className="flex items-center justify-between">
                <button
                  onClick={this.signUp}
                  className={
                    isInvalid
                      ? "bg-secondary text-white font-bold py-2 px-4 rounded cursor-not-allowed"
                      : "bg-secondary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  }
                  type="button"
                  disabled={isInvalid}
                >
                  Sign Up
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm"
                  href="#"
                  onClick={() => this.props.toggleFormState("signIn")}
                >
                  Already signed up?
                </a>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
              &copy;2020 JAMstack ECommerce. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp
