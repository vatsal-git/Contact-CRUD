import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignIn() {
    let navigate = useNavigate()

    const onSignIn = (event) => {
        event.preventDefault()
        const form = document.signupForm

        const data = {
            email: form.email.value,
            password: form.password.value,
        }
        const users = JSON.parse(localStorage.getItem('users'))

        if (!users) {
            alert('You need to SignUp 1')
        } else if (isUserSignedUp(users, data.email)) {
            alert('You need to SignUp 2')
        } else {
            navigate('/home')
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
        <section id="signin" className="center-my-child">
            <form name="signupForm" onSubmit={onSignIn}>
                <header>SignIn</header>
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
                </div>
                <div className="btn-wrapper">
                    <button type="submit" id="signin-btn" className="btn">
                        GO
                    </button>
                </div>
                <p className="or-link">
                    or <br />
                    <Link to="/signup">SignUp</Link>
                </p>
            </form>
        </section>
    )
}

export default SignIn
