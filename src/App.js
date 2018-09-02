import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Nav from './Nav'
import logo from './logo.svg';
import menuItems from './menuItems';

import './App.css';


/****************** for demonstration Nav ******************/
const pages = [];
function savePage(item) {
    if (item.items) {
        item.items.forEach(savePage);
    } else {
        pages.push(item.id);
    }
}
menuItems.forEach(savePage);

const Page = (props) => {
    const path = props.match && props.match.path;

    return (
        <div>
            <Nav items={menuItems} page={path}/>
            <br />
            Page {path}
        </div>
    );
};

const NotFoundPage = () => <div>Not Found</div>;
/**********************************************************/

class App extends Component {
    static renderRoutes() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Page}/>
                    { pages.map(path => <Route key={path} path={`/${path}`} component={Page}/>) }
                    <Route component={NotFoundPage}/>
                </Switch>
            </BrowserRouter>
        );
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <a href="/">
                        <img src={logo} className="App-logo" alt="logo"/>
                    </a>
                </header>
                <div className="App-intro">
                    { App.renderRoutes() }
                </div>
            </div>
        );
    }
}

export default App;
