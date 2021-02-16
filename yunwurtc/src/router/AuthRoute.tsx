import {FC} from "react";
import {Redirect, Route} from "react-router-dom";
import {RouteProps} from "react-router";
import {useGlobalCtxHook} from "../store/GlobalStore";


const AuthRoute: FC<RouteProps> = ({children, ...rest}) => {
    const {state} =useGlobalCtxHook();
    let auth: boolean = !!state.user;
    console.log('auth',state.user)
    return (
        <Route {...rest} render={({location}) => {
            return auth ? children : <Redirect to={{
                pathname: "/login",
                state: {from: location}
            }}/>
        }}>
        </Route>
    )
}

export default AuthRoute