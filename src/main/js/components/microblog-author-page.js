'use strict';

import Reflux from "reflux";
import React from "react";
import Modal from "react-bootstrap/Modal";
import MicroblogPost from "./microblog-post";
import TahrirUIStore from "../stores/tahrir-ui-store"
import {authorFilter} from "../helpers/microblog-filter"
import UIActions from "../actions/tahrir-ui-actions"

class MicroblogAuthorPage extends React.Component {
    constructor(props) {
        super(props);
        this.tahrirStore = Reflux.initStore(TahrirUIStore);
        this.state = {...this.tahrirStore.state};
    }

    componentDidMount() {
        this.unsubscribe = this.tahrirStore.listen(state => this.setState(state));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    close = () => {
        UIActions.updateAuthorPage({nickname: null})
    };

    render() {
        const {authorPage: {nickname}} = this.state;
        const {microblogs = []} = this.props;
        const filter = authorFilter(nickname);
        const microblogPosts = microblogs
            .filter(filter)
            .map((microblog, i) => {
                return <MicroblogPost {...microblog} key={i} />
            });

        return (
            <Modal show={nickname !== null} onHide={this.close} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Posts {nickname} has made</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {microblogPosts}
                </Modal.Body>
            </Modal>
        );
    }
}

export default MicroblogAuthorPage;
