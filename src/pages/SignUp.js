import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
    let navigate = useNavigate()

    const onSignUp = (event) => {
        // event.preventDefault()
        const form = document.signinForm
        const data = {
            email: form.email.value,
            password: form.password.value,
        }
        const users = JSON.parse(localStorage.getItem('users'))

        if (!users) {
            localStorage.setItem('users', JSON.stringify([data]))
            navigate('/home')
        } else if (isUserSignedUp(users, data.email)) {
            localStorage.setItem('users', JSON.stringify([...users, data]))
            navigate('/home')
        } else {
            alert('You are already signed up, please signin')
            navigate('/signin')
        }
    }

    const isUserSignedUp = (users, email) => {
        let count = 0
        users.forEach((user) => {
            if (user.email === email) {
                count++
            }
        })
        return count === 0
    }
    return (
        <section id="signup" className="center-my-child">
            <form name="signinForm" onSubmit={onSignUp}>
                <header>SignUp</header>
                <div className="input-field-wrapper">
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <br />
                        <input
                            type="email"
                            name="email"
                            className="email"
                            required
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <br />
                        <input
                            type="password"
                            name="password"
                            className="password"
                            required
                        />
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
                        />
                    </div>
                </div>
                <div className="btn-wrapper">
                    <button type="submit" id="signup-btn" className="btn">
                        GO
                    </button>
                </div>
                <p className="or-link">
                    or <br />
                    <Link to="/signin">SignIn</Link>
                </p>
            </form>
        </section>
    )
}

export default SignUp
