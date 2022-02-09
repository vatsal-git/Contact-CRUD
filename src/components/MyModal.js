import { Button, Form, Modal } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { getUUID } from './../helper/HelperFunctions'

function MyModal({ activeUserId, title }) {
    const [show, setShow] = useState(false)
    const [form, setForm] = useState({
        userId: activeUserId,
        contactId: '',
        profile: '',
        name: '',
        email: '',
        phone: '',
    })

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const imageUpload = (e) => {
        const file = e.target.files[0]
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

    useEffect(() => {
        setForm({ ...form, contactId: getUUID() })
    }, [])

    const onFormSubmit = (e) => {
        e.preventDefault()
        const userContacts = JSON.parse(localStorage.getItem('userContacts'))

        if (!userContacts) {
            localStorage.setItem('userContacts', JSON.stringify([form]))
        } else {
            localStorage.setItem(
                'userContacts',
                JSON.stringify([...userContacts, form])
            )
        }

        handleClose()

        /*
            userContacts: [{userId:'', contactList: [{contactId: '', name: ''}, {contactId: '', name: ''}]}, {}, {}]  
            */

        // let isUserContactsEmpty = true,
        //     isUserThere = false,
        //     isContactListEmpty = true

        // if (!userContacts) {
        //     isUserContactsEmpty = true
        // } else {
        //     isUserContactsEmpty = false

        //     userContacts.forEach((userContact) => {
        //         if (userContact.contactList.length === 0) {
        //             isContactListEmpty = true
        //         } else {
        //             isContactListEmpty = false
        //         }
        //     })
        // }

        // if (isUserContactsEmpty) {
        //     localStorage.setItem(
        //         'userContacts',
        //         JSON.stringify([{ userId: activeUserId, contactList: [form] }])
        //     )
        // } else {
        //     userContacts.forEach((userContact) => {
        //         if (userContact.userId === activeUserId) {
        //             isUserThere = true
        //             if (isContactListEmpty) {
        //                 localStorage.setItem(
        //                     'userContacts',
        //                     JSON.stringify([
        //                         ...userContacts,
        //                         { userId: activeUserId, contactList: [form] },
        //                     ])
        //                 )
        //             } else {
        //                 localStorage.setItem(
        //                     'userContacts',
        //                     JSON.stringify([
        //                         ...userContacts,
        //                         {
        //                             userId: activeUserId,
        //                             contactList: [
        //                                 ...userContact.contactList,
        //                                 form,
        //                             ],
        //                         },
        //                     ])
        //                 )
        //             }
        //         }
        //     })
        //     if (!isUserThere) {
        //         localStorage.setItem('userContacts', [
        //             ...userContacts,
        //             { uuid: activeUserId, contactList: [form] },
        //         ])
        //     }
        // }
    }
    return (
        <>
            <div className="add-btn-wrapper">
                <Button
                    variant="primary"
                    onClick={handleShow}
                    className="add-btn"
                >
                    +
                </Button>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Form
                    onSubmit={(e) => {
                        onFormSubmit(e)
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group
                            controlId="formFile"
                            className="mb-3"
                            onChange={(e) => {
                                imageUpload(e)
                            }}
                        >
                            <Form.Label>Profile</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter phone number"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        phone: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default MyModal
