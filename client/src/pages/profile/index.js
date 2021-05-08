import React from 'react';
import ChatSection from './../../components/ChatSection/index';

import ProfileSection from './../../components/ProfileSection/index';
import './styles.css';

const Profile = (props) => {

    return(
        <div className="Profile__section">
            {/* <h3>Profile</h3> */}
            <ProfileSection />
            <ChatSection />
        </div>
    );
}

export default Profile;