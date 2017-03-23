'use strict';

import React from "react";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import Form from "react-bootstrap/lib/Form";
import Button from "react-bootstrap/lib/Button";
import Actions from "../actions/tahrir-api-actions";

// TODO we can remove this after we have another component that uses the store
import Reflux from "reflux";
import TahrirStore from "../stores/tahrir-api-store";

class PostForm extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {message: ''};
        this.store = TahrirStore;
    }

    handleSubmit = () => {
        const {message} = this.state;
        Actions.postBroadcastMessage(message);
        this.setState({message: ''});
    };

    handleChange = (e) => {
        this.setState({message: e.target.value});
    };

    render() {
        return (
            <Form inline>
                <FormGroup>
                    <FormControl value={this.state.message} onChange={this.handleChange}
                                 componentClass="textarea" placeholder="Message" />
                    <Button bsStyle="primary" onClick={this.handleSubmit}>
                        Post
                    </Button>
                </FormGroup>
            </Form>
        )
    }
}

module.exports = PostForm;
