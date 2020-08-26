import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

const PrivateRoute = ({component: Component, auth: { token }, ...rest }) => {
  console.log(token);
  return (
    <Route { ...rest } render={ props => (
      //if the login token exists then route to the respective component
      //otherwise route to the login screen
      token ?
        <Component { ...props }/> :
        <Redirect to="/login"/>
    )} />
  )
};

export default connect(mapStateToProps)(PrivateRoute);