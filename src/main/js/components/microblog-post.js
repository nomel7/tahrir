'use strict';

import React from "react";
import UIActions from '../actions/tahrir-ui-actions';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en);

class MicroblogPost extends React.Component {
    onAuthorClick = (nickname) => {
        UIActions.updateAuthorPage({nickname})
    };

    render() {
        const {message, nickname, timeCreated} = this.props;
        const timeAgo = new TimeAgo('en-US');
        const readableTime = timeAgo.format(new Date(timeCreated), 'twitter');

        return (
            <div className="microblog-post">
                <div>
                    <span onClick={this.onAuthorClick.bind(this, nickname)} className="microblog-nickname">{nickname}</span>
                    <span className="microblog-timestamp">{readableTime}</span>
                </div>
                <p className="microblog-message">{message}</p>
            </div>
        );
    }
}

export default MicroblogPost;
