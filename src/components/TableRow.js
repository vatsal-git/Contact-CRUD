import React from 'react'
import { Figure } from 'react-bootstrap'
import TableData from './TableData'

function TableRow({ userContact }) {
    const userContactKeys = Object.keys(userContact)

    return (
        <tr>
            {userContactKeys.map((userContactKey, i) => {
                console.log(userContact[userContactKey])
                if (
                    userContactKey !== 'userId' &&
                    userContactKey !== 'contactId'
                ) {
                    if (userContactKey === 'profile') {
                        console.log(userContact[userContactKey])
                        return (
                            <td key={i}>
                                <Figure>
                                    <Figure.Image
                                        width={50}
                                        height={50}
                                        alt="user-profile"
                                        src={userContact[userContactKey]}
                                        roundedCircle
                                    />
                                </Figure>
                            </td>
                        )
                    } else {
                        return <td key={i}>{userContact[userContactKey]}</td>
                    }
                }
            })}
        </tr>
    )
}
export default TableRow
