import React from 'react';
import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
  // check if authenticated. Return auth or unauth version of webpage
  const { loading, user } = useAuth0();

  if (!user) { //if (loading || !user) {
    return (
      <div id="profilePage" className="profile page animated">
        <p>Unauth page component</p>
      </div>
    );
  }

  return (
    <div id="profilePage" className="profile page animated">
      <h2>Welcome back {user.name}</h2>
      <p>{'Profile page for users'}</p>
      <p>{'Unauth users will have their changes saved to localStorage instead of backend'}</p>
      <p>{'Cookbook (recipes attached to id), 3 latest searched recipes?'}</p>
      <p>{'link to friends profiles? Maybe (auth feature only)'}</p>
    </div>
  );
}

export default Profile;
