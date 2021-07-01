import { useContext } from 'react';
import { authContext } from '../../context/auth/context';

export const isAuth = (user, permission) => {
  const userCapabilities = user.capabilities || user.acl.capabilities;

  return userCapabilities.includes(permission) ? true : false;
};

const CheckAuth = (props) => {
  const { user } = useContext(authContext);
  const userCapabilities = user.capabilities || user.acl.capabilities;

  return userCapabilities.includes(props.permission) ? props.children : null;
};

export default CheckAuth;
