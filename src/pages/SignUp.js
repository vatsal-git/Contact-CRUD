import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Alert, Button } from 'react-bootstrap'
import { getUUID } from './../helper/HelperFunctions'

function SignUp() {
    let navigate = useNavigate()
    const error = document.getElementsByClassName('error')
    const [form, setForm] = useState({
        userId: '',
        email: '',
        password: '',
    })
    const [doValid, setDoValid] = useState(false)

    useEffect(() => {
        setForm({ ...form, userId: getUUID() })
    }, [])

    const onFormSubmit = (event) => {
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
            form.password ===
            document.getElementById('formBasicConfirmPassword').value
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

    // HELPERS END

    return (
        <section id="signup" className="center-my-child">
            <Form onSubmit={(event) => onFormSubmit(event)}>
                <Alert.Heading>Sign-Up</Alert.Heading>
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

                <Form.Group className="mb-3" controlId="formBasicPassword">
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
                    className="mb-3"
                    controlId="formBasicConfirmPassword"
                >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    <p className="error"></p>
                </Form.Group>

                <Form.Group className="mb-3 d-grid" controlId="formBasicButton">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
                <Form.Text className="or-link">
                    Or
                    <br />
                    <Link to="/signin">Sign-In</Link>
                </Form.Text>
            </Form>
        </section>
    )
}

export default SignUp
