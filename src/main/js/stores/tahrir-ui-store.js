'use strict';

import Reflux from "reflux";
import Actions from "../actions/tahrir-ui-actions";

class TahrirApiStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = Actions;
        this.state = {
            authorPage: {nickname: null}
        };
    }

    updateAuthorPage({nickname}) {
        this.setState({authorPage: {nickname}});
    }
}

export default TahrirApiStore;
