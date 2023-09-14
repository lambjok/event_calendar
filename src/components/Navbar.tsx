import React, { FC } from 'react';
import { AppDispatch } from '../store';

import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';

import { Layout, Menu, Row } from 'antd';

import { RouteNames } from '../routes';
import { AuthActionCreators } from '../store/reducers/auth/action-creators';
import { useActions } from '../hooks/useActions';

const Navbar = () => {
  const navigate = useNavigate();

  const { logout } = useActions();

  const { isAuth, user } = useTypedSelector(state => state.auth);
  return (
    <Layout.Header>
      <Row justify="end">
        {isAuth 
          ?
            <>
              <div style={{color: 'white'}}>{user.username}</div>
              <Menu 
                theme='dark'
                mode='horizontal'
                selectable={false} 
                items={[
                  {key: 1, label: 'Exit', onClick: () => logout() },       
                ]}
              />
            </>
          :
            <Menu 
              theme='dark'
              mode='horizontal'
              selectable={false}
              items={[
                {key: 1, label: 'Login', onClick: () => navigate(`${RouteNames.LOGIN}`) },
                {key: 2, label: 'About', onClick: () => navigate(`${RouteNames.ABOUT}`)},        
              ]}
            />            
        }
      </Row>
    </Layout.Header>
  );
};

export default Navbar;