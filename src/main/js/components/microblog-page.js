'use strict';

import React from 'react';
import Reflux from 'reflux';
import APIActions from '../actions/tahrir-api-actions';
import TahrirAPIStore from '../stores/tahrir-api-store';
import PostForm from "./post-form";
import MicroblogAuthorPage from "./microblog-author-page";
import MicroblogPost from "./microblog-post";

class MicroblogPage extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {showAuthorPage: null};
        this.store = TahrirAPIStore;
    }

    componentDidMount() {
        APIActions.listBroadcastMessages();
    }

    render() {
        const {filter = () => {return true}, name} = this.props;
        const {microblogs} = this.state;

        const microblogPosts = microblogs
            .filter(filter)
            .map((microblog, i) => {
                return <MicroblogPost {...microblog} key={i} />
            });

        return (
            <div>
                <MicroblogAuthorPage microblogs={microblogs} />
                <PostForm />
                <h2 className="microblog-page-name">{name}</h2>
                <div className="microblog-posts">
                    {microblogPosts}
                </div>
            </div>
        )
    }
}

export default MicroblogPage;
