import {FC} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Login from "../pages/login/Login";
import AppThemeStoreDemo from "../demo/AppThemeStoreDemo";
import NoMatch from "../pages/nomatch/NoMatch";
import AuthRoute from "./AuthRoute";
import GlobalStore from "../store/GlobalStore";
import Room from "../pages/room/Room";

const AppRouter: FC = () => {
    return (
        <GlobalStore>
            <Router>
                <Switch>
                    <Route exact={true} path="/" render={() => {
                        return (
                            <Redirect to={{
                                pathname: "/login",
                            }}/>
                        )
                    }}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/demo" component={AppThemeStoreDemo}  />
                    <AuthRoute path={"/room"}>
                        <Room/>
                    </AuthRoute>
                    <Route path="*">
                        <NoMatch/>
                    </Route>
                </Switch>
            </Router>
        </GlobalStore>
    )
}


export default AppRouter