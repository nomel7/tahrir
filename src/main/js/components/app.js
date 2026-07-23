'use strict';

import React from "react";
import Reflux from "reflux";
import Navigator from "./navigator";
import Login from "./login"
import Actions from "../actions/tahrir-api-actions";
import TahrirStore from "../stores/tahrir-api-store";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.tahrirStore = Reflux.initStore(TahrirStore);
        this.state = {identity: {nickname: null}, ...this.tahrirStore.state};
    }

    componentDidMount() {
        this.unsubscribe = this.tahrirStore.listen(state => this.setState(state));
        Actions.getIdentity();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {identity: {nickname}} = this.state;
        return (
            <div className="app">
                {nickname !== null ? <Navigator /> : <Login />}
            </div>
        )
    }
}

export default App;
