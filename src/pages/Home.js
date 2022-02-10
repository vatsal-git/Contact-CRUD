import React, { useState } from 'react'
import { AuthConsumer } from '../helper/AuthContext'
import { Alert, Button, Table } from 'react-bootstrap'
import TableRow from '../components/TableRow'
import FormModal from '../components/FormModal'
import { getUUID } from './../helper/HelperFunctions'
import '../App.css'

function Home() {
    const [userContacts, setUserContacts] = useState(
        JSON.parse(localStorage.getItem('userContacts'))
    )
    const activeUserContacts = []

    const updateContacts = () => {
        setUserContacts(JSON.parse(localStorage.getItem('userContacts')))
    }

    const getActiveUserContacts = (activeUserId) => {
        if (userContacts)
            userContacts.forEach((userContact) => {
                if (userContact.userId === activeUserId)
                    activeUserContacts.push(userContact)
            })
    }

    return (
        <section id="home">
            <AuthConsumer>
                {({ activeUserId, logout }) => (
                    <>
                        <div className="logout-btn-wrapper">
                            <Button variant="danger" onClick={logout}>
                                Logout
                            </Button>
                        </div>

                        <main className="contact-list-wrapper">
                            <FormModal
                                title={'Add Contact'}
                                buttonName={'+'}
                                btnClassName={{
                                    wrapper: 'add-btn-wrapper',
                                    element: 'add-btn',
                                }}
                                initialFormValues={{
                                    userId: activeUserId,
                                    contactId: getUUID(),
                                    profile: '',
                                    name: '',
                                    email: '',
                                    phone: '',
                                }}
                                updateContacts={updateContacts}
                                contactIndex={
                                    userContacts ? userContacts.length : 0
                                }
                            />
                            <Alert.Heading className="mb-3">
                                Contact List
                            </Alert.Heading>
                            <Table responsive borderless striped bsPrefix>
                                <thead>
                                    <tr>
                                        <th>Profile</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone number</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getActiveUserContacts(activeUserId)}
                                    {activeUserContacts.map(
                                        (activeUserContact, i) => {
                                            return (
                                                <TableRow
                                                    activeUserContact={
                                                        activeUserContact
                                                    }
                                                    userContacts={userContacts}
                                                    key={'tr' + i}
                                                    updateContacts={
                                                        updateContacts
                                                    }
                                                />
                                            )
                                        }
                                    )}
                                </tbody>
                            </Table>
                        </main>
                    </>
                )}
            </AuthConsumer>{' '}
        </section>
    )
}

export default Home
