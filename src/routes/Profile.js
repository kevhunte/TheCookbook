import React from 'react';

const Profile = () => {
  // check if authenticated. Return auth or unauth version of webpage
  return (
    <div id="profilePage" className="profile page">
      <p>{'Profile page for users'}</p>
      <p>{'Unauth users will have their changes saved to localStorage instead of backend'}</p>
      <p>{'Cookbook (recipes attached to id), 3 latest searched recipes?'}</p>
      <p>{'link to friends profiles? Maybe (auth feature only)'}</p>
    </div>
  );
}

export default Profile;
