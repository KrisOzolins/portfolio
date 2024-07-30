import React, { useContext } from 'react';
import { AuthContext } from '../../lib/context/AuthContext';
import Icon from '@/components/common/Icon';

const LoginButton = () => {
  const { login } = useContext(AuthContext);

  return (
    <button onClick={login}>
      <Icon style="brands" name="google" />
      Login with Google
    </button>
  );
};

export default LoginButton;
