import { Redirect, Route } from 'react-router-dom';

export function CustomRoute(props){
  return (
    <>
      {
        props.redirect ? (
          <Redirect to={props.to}/>
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

CustomRoute.defaultProps = {
  to: '/'
}