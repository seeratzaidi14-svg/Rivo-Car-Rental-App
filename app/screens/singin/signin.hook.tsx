import {useState} from 'react';
import {ISignInProps} from './signin.props';

export const useSignin = (): ISignInProps => {
  const [isSecure, setIsSecure] = useState(false);
  return {
    isSecure,
    setIsSecure,
  };
};
