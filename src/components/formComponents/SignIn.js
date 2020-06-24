import React from "react"

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
  validErrors: {
    email: "",
    password: "",
  },
}

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
)

class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  signIn = event => {
    const { email, password } = this.state

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({ error: null })
    let errors = this.state.validErrors

    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!"
        break
      case "password":
        errors.password = value.length < 1 ? "Password is Empty!" : ""
        break
      default:
        break
    }
    this.setState({ errors, [name]: value })
  }
  render() {
    const { toggleFormState } = this.props
    const { error, password, email, validErrors } = this.state
    const isInvalid =
      password === "" || email === "" || validErrors.email !== ""
    return (
      <div>
        <h3>Sign In</h3>
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-144">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  onChange={this.onChange}
                  name="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
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
              {error && (
                <p class="text-red-500 text-xs italic">{error.message}</p>
              )}
              <div className="flex items-center justify-between">
                <button
                  onClick={this.signIn}
                  className={
                    isInvalid
                      ? "bg-secondary text-white font-bold py-2 px-4 rounded cursor-not-allowed"
                      : "bg-secondary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  }
                  type="button"
                  disabled={isInvalid}
                >
                  Sign In
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm"
                  href="#"
                  onClick={() => toggleFormState("passwordForget")}
                >
                  Forgot Password?
                </a>
                <a
                  className="inline-block align-baseline font-bold text-sm"
                  href="#"
                  onClick={() => toggleFormState("signUp")}
                >
                  Go go Sign Up
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

export default SignIn
