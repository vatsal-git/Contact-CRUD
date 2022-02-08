import React, { useState } from 'react'
import { AuthConsumer } from '../helper/AuthContext'
import MyModal from '../components/MyModal'

function Home() {
    const [userContact, setUserContact] = useState(undefined)

    const getUserContact = (userId) => {
        const users = JSON.parse(localStorage.getItem('users'))
        users.forEach((user) => {
            console.log(user.uuid, userId)
            if (user.uuid === userId) {
                // localStorage.setItem(user.contact)
                setUserContact({
                    profile: user.contact.profile,
                    name: user.contact.name,
                    email: user.contact.email,
                    phone: user.contact.number,
                })
            }
        })
    }

    return (
        <section id="home">
            <AuthConsumer>
                {({ user, logout }) => (
                    <>
                        <div className="logout-btn-wrapper">
                            <button
                                id="logout-btn"
                                className="btn"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>

                        <main className="contact-list-wrapper">
                            <MyModal
                                uuid={user}
                                title={'Add Contact'}
                                type={'add'}
                            />
                            <header>Contact List</header>
                            <table id="contact-table">
                                <thead>
                                    <tr
                                        className="table-row"
                                        id="table-header-row"
                                    >
                                        <th className="table-row-item">
                                            Profile
                                        </th>
                                        <th className="table-row-item">Name</th>
                                        <th className="table-row-item">
                                            Email
                                        </th>
                                        <th className="table-row-item">
                                            Phone number
                                        </th>
                                    </tr>
                                </thead>
                                {/* <tbody>
                        <tr className="table-row table-data-row">
                            <td className="table-row-item">Img</td>
                            <td className="table-row-item">Vatsal Patel</td>
                            <td className="table-row-item">vatsal@email.com</td>
                            <td className="table-row-item">1111111111</td>
                        </tr>
                    </tbody> */}
                                {getUserContact(user)}
                            </table>
                        </main>
                    </>
                )}
            </AuthConsumer>
        </section>
    )
}

export default Home
