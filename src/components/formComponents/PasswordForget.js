import React, { Component } from "react"

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
)

const INITIAL_STATE = {
  email: "",
  error: null,
  validErrors: {
    email: "",
  },
}

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email } = this.state

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.toggleFormState("signIn")
      })
      .catch(error => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  onChange = event => {
    const { name, value } = event.target
    this.setState({ error: null })
    let errors = this.state.validErrors
    errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!"
    this.setState({ errors, [name]: value })
  }

  render() {
    const { toggleFormState } = this.props
    const { email, error, validErrors } = this.state
    const isInvalid = email === ""

    return (
      <>
        <h3>Forgot Password</h3>
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-144">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={this.onSubmit}
            >
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

              <div className="flex items-center justify-between">
                <button
                  className={
                    isInvalid
                      ? "bg-secondary text-white font-bold py-2 px-4 rounded cursor-not-allowed"
                      : "bg-secondary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  }
                  type="submit"
                  disabled={isInvalid}
                >
                  Reset My Password
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm"
                  href="#"
                  onClick={() => toggleFormState("signIn")}
                >
                  Go back to Sign In
                </a>
              </div>
              {error && (
                <p class="text-red-500 text-xs italic">{error.message}</p>
              )}
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default PasswordForgetForm
