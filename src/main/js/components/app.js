'use strict';

import React from "react";
import Reflux from "reflux";
import Navigator from "./navigator";
import Login from "./login"
import Actions from "../actions/tahrir-api-actions";
import TahrirStore from "../stores/tahrir-api-store";

class App extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {identity: {nickname: null}};
        this.store = TahrirStore;
    }

    componentDidMount() {
        Actions.getIdentity();
    }

    render() {
        const {identity: {nickname}} = this.state;
        return (
            <div className="app">
                {nickname !== null && nickname !== 'Default' ? <Navigator /> : <Login />}
            </div>
        )
    }
}

export default App;
