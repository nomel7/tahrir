'use strict';

import Reflux from "reflux";
import Actions from "../actions/tahrir-api-actions";
import Rest from "rest";
import errorCode from "rest/interceptor/errorCode";

class TahrirApiStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = Actions;
        this.state = {
            microblogs: [],
            identity: {nickname: null}
        };
    }

    postBroadcastMessage(message) {
        const client = Rest.wrap(errorCode, {code: 202});
        client({
            method: 'POST',
            path: '/api/broadcastMessages',
            entity: JSON.stringify({message}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            () => {
                this.listBroadcastMessages();
            },
            () => {
                console.error('Error posting microblog');
            }
        );
    }

    listBroadcastMessages() {
        const client = Rest.wrap(errorCode, {code: 201});
        client({
            method: 'GET',
            path: '/api/broadcastMessages',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            response => {
                const {entity} = response;
                this.setState({microblogs: JSON.parse(entity)});
            },
            () => {
                console.error('Error loading microblogs');
            }
        );
    }

    getIdentity() {
        const client = Rest.wrap(errorCode, {code: 201});
        client({
            method: 'GET',
            path: '/api/identity',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            ({entity}) => {
                this.setState({identity: {nickname: JSON.parse(entity).nickname}});
            },
            () => {
                console.error('Error getting identity');
            }
        );
    }

    postIdentity({nickname}) {
        const client = Rest.wrap(errorCode, {code: 202});
        client({
            method: 'POST',
            path: '/api/identity',
            entity: JSON.stringify({nickname}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            () => {
                this.getIdentity();
            },
            () => {
                console.error('Error posting identity');
            }
        );
    }
}

export default TahrirApiStore;
