'use strict';

import React from "react";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Actions from "../actions/tahrir-api-actions";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {identity: {nickname: ''}}
    }

    handleChange = (e) => {
        this.setState({identity: {nickname: e.target.value}});
    };

    handleSubmit = () => {
        const {identity} = this.state;
        Actions.postIdentity(identity);
    };

    render() {
        return (
            <Form>
                <FormGroup>
                    <FormControl value={this.state.identity.nickname} onChange={this.handleChange} />
                    <Button onClick={this.handleSubmit}>
                        Create new user
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}

export default Login;
