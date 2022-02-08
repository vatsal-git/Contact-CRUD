import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
    let navigate = useNavigate()
    const error = document.getElementsByClassName('error')
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const [doValid, setDoValid] = useState(false)

    useEffect(() => {}, [form])

    const onFormSubmit = (event) => {
        form.uuid = create_UUID()

        setDoValid(true)
        event.preventDefault()
        const users = JSON.parse(localStorage.getItem('users'))

        if (validate()) {
            if (!users) {
                localStorage.setItem('users', JSON.stringify([form]))
                navigate('/')
            } else if (isUserSignedUp(users)) {
                localStorage.setItem('users', JSON.stringify([...users, form]))
                navigate('/')
            } else {
                error[0].textContent = '*User Exist, SignIn'
            }
        }
    }

    // HELPERS

    const validate = () => {
        error[1].textContent = form.email.match(
            // eslint-disable-next-line no-useless-escape
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        )
            ? ''
            : '*Invalid Email'

        error[3].textContent =
            form.password === document.signupForm.confirmPassword.value
                ? ''
                : '*Enter same password'

        return error[1].textContent === error[3].textContent
    }

    const isUserSignedUp = (users) => {
        let count = 0
        users.forEach((user) => {
            if (user.email === form.email) {
                count++
            }
        })
        return count === 0
    }

    const create_UUID = () => {
        var dt = new Date().getTime()
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (c) {
                var r = (dt + Math.random() * 16) % 16 | 0
                dt = Math.floor(dt / 16)
                return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
            }
        )
        return uuid
    }

    // HELPERS END

    return (
        <section id="signup" className="center-my-child">
            <form name="signupForm" onSubmit={(event) => onFormSubmit(event)}>
                <header>SignUp</header>
                <p className="error"></p>
                <div className="input-field-wrapper">
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <br />
                        <input
                            type="text"
                            name="email"
                            className="email"
                            required
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
                            required
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value,
                                })
                            }
                        />
                        <p className="error"></p>
                    </div>
                    <div className="input-field">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <br />
                        <input
                            type="password"
                            name="confirmPassword"
                            className="password"
                            required
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    confirmPassword: e.target.value,
                                })
                                if (doValid) validate()
                            }}
                        />
                        <p className="error"></p>
                    </div>
                </div>
                <div className="btn-wrapper">
                    <button type="submit" id="signup-btn" className="btn">
                        GO
                    </button>
                </div>
                <p className="or-link">
                    or <br />
                    <Link to="/">SignIn</Link>
                </p>
            </form>
        </section>
    )
}

export default SignUp
