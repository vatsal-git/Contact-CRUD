import React, { useEffect, useState } from 'react'
import { Button, Figure, Form, Modal } from 'react-bootstrap'
import {
    validateEmail,
    validateName,
    validatePhone,
    validateProfile,
} from '../helper/HelperFunctions'

function FormModal({
    title,
    buttonName,
    btnClassName,
    initialFormValues,
    updateContacts,
    contactIndex,
}) {
    const [show, setShow] = useState(false)
    const [form, setForm] = useState(initialFormValues)
    const [doValid, setDoValid] = useState(false)

    const error = document.getElementsByClassName('error')
    useEffect(() => {
        if (doValid) validate()
    }, [form])

    const handleClose = () => setShow(false)
    const handleShow = () => {
        setForm(initialFormValues)
        setDoValid(false)
        setShow(true)
    }

    let file
    const imageUpload = (e) => {
        file = e.target.files[0]
        error[0].textContent = validateProfile(file)
        getBase64(file).then((base64) => {
            setForm({ ...form, profile: base64 })
        })
    }
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject(error)
            reader.readAsDataURL(file)
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        setDoValid(true)
        if (validate()) {
            const userContacts = JSON.parse(
                localStorage.getItem('userContacts')
            )

            if (!userContacts) {
                localStorage.setItem('userContacts', JSON.stringify([form]))
            } else {
                userContacts.splice(contactIndex, 1, form)
                localStorage.setItem(
                    'userContacts',
                    JSON.stringify(userContacts)
                )
                updateContacts()
            }
            updateContacts()
            handleClose()
        }
    }

    const validate = () => {
        error[1].textContent = validateName(form.name)
        error[2].textContent = validateEmail(form.email)
        error[3].textContent = validatePhone(form.phone)
        if (form.profile === '') error[0].textContent = '*No image'

        return form.profile !== '' &&
            error[1].textContent === '' &&
            error[2].textContent === '' &&
            error[3].textContent === ''
            ? true
            : false
    }

    return (
        <>
            <div className={btnClassName.wrapper}>
                <Button
                    className={btnClassName.element}
                    variant="primary"
                    onClick={handleShow}
                >
                    {buttonName}
                </Button>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Form onSubmit={onFormSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group
                            controlId="formFile"
                            className="mb-3"
                            onChange={(e) => {
                                imageUpload(e)
                                if (doValid) validate()
                            }}
                        >
                            <Form.Label>Profile</Form.Label>
                            <Form.Control type="file" />
                            <p className="error"></p>
                            <Figure className="profile-preview-wrapper">
                                <Figure.Image
                                    width={50}
                                    height={50}
                                    alt="Select picture to preview"
                                    src={form.profile}
                                    className="profile-preview"
                                    thumbnail
                                />
                            </Figure>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        name: e.target.value,
                                    })
                                    if (doValid) validate()
                                }}
                                value={form.name}
                            />
                            <p className="error"></p>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        email: e.target.value,
                                    })
                                    if (doValid) validate()
                                }}
                                value={form.email}
                            />
                            <p className="error"></p>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter phone number"
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        phone: e.target.value,
                                    })
                                    if (doValid) validate()
                                }}
                                value={form.phone}
                            />
                            <p className="error"></p>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default FormModal
