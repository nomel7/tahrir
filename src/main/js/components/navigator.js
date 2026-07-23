'use strict';

import React from "react";
import Reflux from "reflux";
import MicroblogPage from "./microblog-page"
import Nav from "react-bootstrap/Nav";
import TahrirStore from '../stores/tahrir-api-store';
import {mentionsFilter} from "../helpers/microblog-filter";
import {AllIcon, FollowingIcon, MentionsIcon} from "./icons";

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
            <div className="app-shell">
                <nav className="sidebar">
                    <div className="sidebar-brand">
                        <img src="/images/tahrir-logo.png" alt="" className="sidebar-logo" />
                        <span className="sidebar-title">Tahrir</span>
                    </div>
                    <Nav variant="pills" className="flex-column sidebar-nav" activeKey={activeKey} onSelect={this.onSelect}>
                        <Nav.Link eventKey={1}><AllIcon />All</Nav.Link>
                        <Nav.Link eventKey={2}><FollowingIcon />Following</Nav.Link>
                        <Nav.Link eventKey={3}><MentionsIcon />Mentions</Nav.Link>
                    </Nav>
                </nav>
                <main className="content">
                    {display}
                </main>
            </div>
        );
    }
}

export default Navigator;
