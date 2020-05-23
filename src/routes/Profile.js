import React from 'react';

const Profile = () => {
  // check if authenticated. Return auth or unauth version of webpage
  return (
    <div id="profilePage" className="profile page">
      <p>{'Profile page for users'}</p>
      {'Cookbook (recipes attached to id), 3 latest searched recipes?'}<br/>
      {'link to friends profiles? Maybe'}
    </div>
  );
}

export default Profile;
