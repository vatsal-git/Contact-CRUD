import { Button, Modal } from 'react-bootstrap'
import React, { useState } from 'react'

function MyModal({ title, type }) {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const imageUpload = (e) => {
        const file = e.target.files[0]
        getBase64(file).then((base64) => {
            // localStorage['fileBase64'] = base64
            console.debug('file stored', base64)
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
    return (
        <>
            <div className="add-btn-wrapper">
                <Button id="add-btn" variant="primary" onClick={handleShow}>
                    <span className="add-txt">+</span>
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-field-wrapper">
                        <input type="text" name="name" placeholder="Name" />
                        <input type="text" name="email" placeholder="Email" />
                        <input
                            type="tel"
                            name="name"
                            placeholder="Phone Number"
                        />
                        <input
                            type="file"
                            id="imageFile"
                            name="imageFile"
                            onChange={(e) => imageUpload(e)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default MyModal
