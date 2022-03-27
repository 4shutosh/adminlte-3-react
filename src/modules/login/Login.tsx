import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useTranslation} from 'react-i18next';
import {loginUser} from '@store/reducers/auth';
import {Button} from '@components';
import {setWindowClass, sleep} from '@app/utils/helpers';

import * as AuthService from '../../services/auth';

const Login = () => {
  const [isAuthLoading] = useState(false);
  const [isGoogleAuthLoading, setGoogleAuthLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [t] = useTranslation();

  const loginProcess = async () => {
    try {
      setGoogleAuthLoading(true);
      const response = await AuthService.loginByFirebaseAndAPI();
      if (response !== undefined) {
        toast.success(`Login Success!`);
        setGoogleAuthLoading(false);
        dispatch(loginUser(response));
        await sleep(1000);
        navigate('/');
      } else {
        setGoogleAuthLoading(false);
        toast.error('Failed!');
      }
    } catch (error: any) {
      setGoogleAuthLoading(false);
      toast.error(error.message || 'Failed!');
    }
  };

  setWindowClass('hold-transition login-page');

  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h1">
            <b>CollegeApp IITN </b>
            <span>Dashboard</span>
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">{t('login.label.signIn')}</p>
          <div className="social-auth-links text-center mt-2 mb-3">
            <Button
              block
              icon="google"
              theme="danger"
              onClick={loginProcess}
              isLoading={isGoogleAuthLoading}
              disabled={isAuthLoading}
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
