import React from 'react'
import { AuthConsumer } from '../helper/AuthContext'
import MyModal from '../components/MyModal'
import { Alert, Button, Table } from 'react-bootstrap'
import TableRow from '../components/TableRow'

function Home() {
    const userContacts = JSON.parse(localStorage.getItem('userContacts'))

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
                            <MyModal
                                activeUserId={activeUserId}
                                title={'Add Contact'}
                            />
                            <Alert.Heading className="mb-3">
                                Contact List
                            </Alert.Heading>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Profile</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr>
                                        <td>hello</td>
                                    </tr> */}
                                    {userContacts.map((userContact, i) => {
                                        if (userContact.userId === activeUserId)
                                            return (
                                                <TableRow
                                                    userContact={userContact}
                                                    key={i}
                                                />
                                            )
                                    })}
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
