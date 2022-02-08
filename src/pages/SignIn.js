import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthConsumer } from '../helper/AuthContext'

function SignIn() {
    const navigate = useNavigate()
    const error = document.getElementsByClassName('error')
    const [form, setForm] = useState({ email: '', password: '' })
    const [doValid, setDoValid] = useState(false)

    const onFormSubmit = (event, login) => {
        event.preventDefault()
        setDoValid(true)
        const users = JSON.parse(localStorage.getItem('users'))

        if (validate()) {
            if (!users) {
                error[0].textContent = '*New user, Please SignUp'
            } else if (isUserValid(users)) {
                login(form)
                navigate('/home')
            }
        }
    }

    // HELPER

    const validate = () => {
        error[1].textContent = form.email.match(
            // eslint-disable-next-line no-useless-escape
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        )
            ? ''
            : '*Invalid Email'

        return error[1].textContent === ''
    }

    const isUserValid = (users) => {
        let count1 = 0,
            count2 = 0
        users.forEach((user) => {
            if (user.email === form.email) {
                count1++
                if (user.password === form.password) {
                    count2++
                    error[2].textContent = ''
                    form.uuid = user.uuid
                } else {
                    error[2].textContent = '*Wrong password'
                    error[0].textContent = ''
                }
            }
        })

        if (count1 === 0) {
            error[2].textContent = ''
            error[0].textContent = '*New user, Please SignUp'
            return false
        } else if (count2 === 0) {
            return false
        } else {
            return true
        }
    }

    //HELPER END

    return (
        <section id="signin" className="center-my-child">
            <AuthConsumer>
                {({ login }) => (
                    <form
                        name="signupForm"
                        onSubmit={(event) => onFormSubmit(event, login)}
                    >
                        <header>SignIn</header>
                        <p className="error"></p>
                        <div className="input-field-wrapper">
                            <div className="input-field">
                                <label htmlFor="email">Email</label>
                                <br />
                                <input
                                    type="email"
                                    name="email"
                                    className="email"
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                        if (doValid) validate()
                                    }}
                                />
                                <p className="error"></p>
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">Password</label>
                                <br />
                                <input
                                    type="password"
                                    name="password"
                                    className="password"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            password: e.target.value,
                                        })
                                    }
                                />
                                <p className="error"></p>
                            </div>
                        </div>
                        <div className="btn-wrapper">
                            <button
                                type="submit"
                                id="signin-btn"
                                className="btn"
                            >
                                GO
                            </button>
                        </div>
                        <p className="or-link">
                            or <br />
                            <Link to="/signup">SignUp</Link>
                        </p>
                    </form>
                )}
            </AuthConsumer>
        </section>
    )
}

export default SignIn
