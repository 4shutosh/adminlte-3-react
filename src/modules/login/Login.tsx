import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useTranslation} from 'react-i18next';
import {loginUser} from '@store/reducers/auth';
import {Button} from '@components';
import {setWindowClass} from '@app/utils/helpers';

import * as AuthService from '../../services/auth';

const Login = () => {
  const [isAuthLoading] = useState(false);
  const [isGoogleAuthLoading, setGoogleAuthLoading] = useState(false);
  const [isFacebookAuthLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [t] = useTranslation();

  // const login = async (email: string, password: string) => {
  //   try {
  //     setAuthLoading(true);
  //     const token = await AuthService.loginByAuth(email, password);
  //     toast.success('Login is succeed!');
  //     setAuthLoading(false);
  //     dispatch(loginUser(token));
  //     navigate('/');
  //   } catch (error: any) {
  //     setAuthLoading(false);
  //     toast.error(error.message || 'Failed');
  //   }
  // };

  const loginByGoogle = async () => {
    try {
      setGoogleAuthLoading(true);
      const token = await AuthService.loginByGoogle();
      toast.success('Login is succeeded!');
      setGoogleAuthLoading(false);
      dispatch(loginUser(token));
      navigate('/');
    } catch (error: any) {
      setGoogleAuthLoading(false);
      toast.error(error.message || 'Failed');
    }
  };

  // const loginByFacebook = async () => {
  //   try {
  //     setFacebookAuthLoading(true);
  //     const token = await AuthService.loginByFacebook();
  //     toast.success('Login is succeeded!');
  //     setFacebookAuthLoading(false);
  //     dispatch(loginUser(token));
  //     navigate('/');
  //   } catch (error: any) {
  //     setFacebookAuthLoading(false);
  //     toast.error(error.message || 'Failed');
  //   }
  // };

  setWindowClass('hold-transition login-page');

  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h1">
            <b>Admin</b>
            <span>LTE</span>
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">{t('login.label.signIn')}</p>
          <div className="social-auth-links text-center mt-2 mb-3">
            <Button
              block
              icon="google"
              theme="danger"
              onClick={loginByGoogle}
              isLoading={isGoogleAuthLoading}
              disabled={isAuthLoading || isFacebookAuthLoading}
            >
              {/* @ts-ignore */}
              {t('login.button.signIn.social', {what: 'Google'})}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
