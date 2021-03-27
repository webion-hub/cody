import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export function CustomRoute(props){
  return (
    <>
      {
        props.redirect ? (
          <Redirect to={props.redirectTo? props.redirectTo : '/'}/>
        ):(
          <Route 
            exact={props.exact}
            path={props.path} 
            component={props.component} 
          />
        )
      }
    </>
  );
}