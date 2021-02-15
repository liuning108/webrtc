import React, {FC} from 'react';
import './App.css';
import {BrowserRouter as Router,Link,Switch,Route,useRouteMatch,useParams} from "react-router-dom";
function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}


interface ITopicParams {
    topicId:string
}
function Topic() {
    let { topicId } = useParams<ITopicParams>();
    return <h3>Requested topic ID: {topicId}</h3>;
}

function Topics(){
    let match = useRouteMatch();
    console.log("Topics",match)
    return (

        <>
            <ul>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>
                        Props v. State
                    </Link>
                </li>
            </ul>
            <Switch>
                <Route path={`${match.path}/:topicId`}>
                    <Topic />
                </Route>
                <Route path={match.path}>
                    <h3>Please select a topic.</h3>
                </Route>
            </Switch>
        </>

    )
}
const AppBaseRouterDemo: FC = () => {
    return (
        <Router>
            <div>

                <nav>
                    <ul>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                        <li>
                            <Link to="/topics">Topics</Link>
                        </li>
                    </ul>
                </nav>


                <Switch>
                    <Route path="/topics">
                        <Topics />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>

            </div>

        </Router>
    )
}


export default AppBaseRouterDemo;
