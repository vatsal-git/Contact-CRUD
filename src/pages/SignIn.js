import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AuthConsumer } from '../helper/AuthContext'

function SignIn() {
    const navigate = useNavigate()
    const error = document.getElementsByClassName('error')
    const [form, setForm] = useState({ userId: '', email: '', password: '' })
    const [doValid, setDoValid] = useState(false)

    const onFormSubmit = (event, login) => {
        event.preventDefault()
        setDoValid(true)
        const users = JSON.parse(localStorage.getItem('users'))

        if (validate()) {
            if (!users) {
                error[0].textContent = '*New user, Please SignUp'
            } else if (isUserValid(users)) {
                login(form.userId)
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
                    form.userId = user.userId
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
                    <Form onSubmit={(event) => onFormSubmit(event, login)}>
                        <Alert.Heading>Sign In</Alert.Heading>
                        <p className="error"></p>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        email: e.target.value,
                                    })
                                    if (doValid) validate()
                                }}
                                type="email"
                                placeholder="Enter email"
                            />
                            <p className="error"></p>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <p className="error"></p>
                        </Form.Group>

                        <Form.Group
                            className="mb-3 d-grid"
                            controlId="formBasicButton"
                        >
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form.Group>

                        <Form.Text className="or-link">
                            Or
                            <br />
                            <Link to="/signup">SignUp</Link>
                        </Form.Text>
                    </Form>
                )}
            </AuthConsumer>
        </section>
    )
}

export default SignIn
