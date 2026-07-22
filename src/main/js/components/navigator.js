'use strict';

import React from "react";
import Reflux from "reflux";
import MicroblogPage from "./microblog-page"
import Nav from "react-bootstrap/Nav";
import TahrirStore from '../stores/tahrir-api-store';
import {mentionsFilter} from "../helpers/microblog-filter";

class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.tahrirStore = Reflux.initStore(TahrirStore);
        this.state = {activeKey: 1, ...this.tahrirStore.state};
    }

    componentDidMount() {
        this.unsubscribe = this.tahrirStore.listen(state => this.setState(state));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onSelect = (eventKey) => {
        this.setState({activeKey: eventKey})
    };

    render() {
        const {identity: {nickname}, activeKey} = this.state;
        const filter = mentionsFilter(nickname);
        const tabs = {
            1: <MicroblogPage name={'Feed for ' + nickname}/>,
            2: null,
            3: <MicroblogPage filter={filter} name={'Mentions for ' + nickname} />
        };
        const display = tabs[activeKey];

        return (
            <div>
                <header>
                    <h1>Tahrir</h1>
                    <Nav variant="pills" activeKey={activeKey} onSelect={this.onSelect}>
                        <Nav.Link eventKey={1}>All</Nav.Link>
                        <Nav.Link eventKey={2}>Following</Nav.Link>
                        <Nav.Link eventKey={3}>Mentions</Nav.Link>
                    </Nav>
                </header>
                <div className="content">
                    {display}
                </div>
            </div>
        );
    }
}

export default Navigator;
