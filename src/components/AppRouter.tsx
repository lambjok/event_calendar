import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { RouteNames, privateRoutes, publicRoutes } from '../routes';
import { useTypedSelector } from '../hooks/useTypedSelector';

const AppRouter = () => {
  const { isAuth } = useTypedSelector(state => state.auth);
  return (
    isAuth 
      ?
      <Routes>
        <Route>
          {privateRoutes.map(route =>
            <Route key={route.path} path={route.path} element={<route.component />} />
          )}
          <Route path='*' element={<Navigate to={RouteNames.EVENT} />}/>
        </Route>
      </Routes>
      :
      <Routes>
        <Route>
          {publicRoutes.map(route =>
            <Route key={route.path} path={route.path} element={<route.component />} />
          )}
          <Route path='*' element={<Navigate to={RouteNames.LOGIN} />}/>
        </Route>
      </Routes>
  )
}

export default AppRouter;