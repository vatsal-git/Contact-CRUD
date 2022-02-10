import React from 'react'
import { Button, Figure } from 'react-bootstrap'
import FormModal from './FormModal'

function TableRow({ activeUserContact, userContacts, updateContacts }) {
    const userContactKeys = Object.keys(activeUserContact)
    const userContactKeysToBeShown = []
    const contactIndex = userContacts.indexOf(activeUserContact)

    userContactKeys.forEach((userContactKey) => {
        if (userContactKey !== 'userId' && userContactKey !== 'contactId') {
            userContactKeysToBeShown.push(userContactKey)
        }
    })

    const handleDelete = () => {
        userContacts.splice(contactIndex, 1)
        localStorage.setItem('userContacts', JSON.stringify([...userContacts]))
        updateContacts()
    }

    return (
        <tr>
            {userContactKeysToBeShown.map((userContactKeyToBeShown, i) => {
                const key = 'td' + i //UNIQUE KEY
                if (userContactKeyToBeShown === 'profile') {
                    return (
                        <td key={key}>
                            <Figure className="profile-pic-wrapper">
                                <Figure.Image
                                    width={50}
                                    height={50}
                                    alt="user-profile"
                                    src={
                                        activeUserContact[
                                            userContactKeyToBeShown
                                        ]
                                    }
                                    className="profile-pic"
                                />
                            </Figure>
                        </td>
                    )
                } else {
                    if (i === userContactKeysToBeShown.length - 1) {
                        return (
                            <React.Fragment key={'rf' + i}>
                                <td key={key}>
                                    {activeUserContact[userContactKeyToBeShown]}
                                </td>
                                <td key={key + i}>
                                    <FormModal
                                        title={'Edit Contact'}
                                        buttonName={'Edit'}
                                        btnClassName={{
                                            wrapper: 'edit-btn-wrapper',
                                            element: 'edit-btn',
                                        }}
                                        initialFormValues={activeUserContact}
                                        contactIndex={contactIndex}
                                        updateContacts={updateContacts}
                                    />
                                </td>
                                <td key={key + i + 1}>
                                    <Button onClick={handleDelete}>
                                        Delete
                                    </Button>
                                </td>
                            </React.Fragment>
                        )
                    } else {
                        return (
                            <td key={key}>
                                {activeUserContact[userContactKeyToBeShown]}
                            </td>
                        )
                    }
                }
            })}
        </tr>
    )
}
export default TableRow
