import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const { isAuthenticated, loading, error, user } = useSelector(state => state.userAuthentication);

    return (
        <React.Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render={(props) => {
                        if (isAuthenticated === false) {
                            return <Redirect to='/User/Login' />
                        }
                        return <Component {...props} />
                    }}
                />
            )}
        </React.Fragment>
    )
}

export default ProtectedRoute
