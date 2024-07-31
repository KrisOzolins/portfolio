import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const OAuthLogin = ({ user }: { user: any }) => {
  // console.log("OAuthLogin", user);
  return (
    <div className="google oauth profile info">
      {user && (
        <div className="flex items-center">
          <img src={user.photo} alt={user.fullName} className="w-8 h-8 rounded-full" />
          <span className="mx-2">{user.fullName}</span>
          <LogoutButton />
        </div>
      )}
      {!user && <LoginButton />}
    </div>
  );
};

export default OAuthLogin;
