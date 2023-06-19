import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig';


const UserInfo = ({ totalTestTaken }) => {
    const [user] = useAuthState(auth);
    return (
        <div className="user-profile">

            <div className="user">
                <div className="picture">
                    <AccountCircleIcon style={{ display: 'block', transform: 'scale(6)', margin: 'auto', marginTop: '3.3rem' }} />
                </div>

                <div className="info">
                    <div className="email">
                        {user.email}
                    </div>
                    <div className="joined-at">
                        {user.metadata.creationTime}
                    </div>
                </div>
                
            </div>

            <div className="total-tests">
                <span>Total Test Taken - {totalTestTaken}  </span>
            </div>
        </div>
    )
}

export default UserInfo