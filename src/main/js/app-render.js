'use strict';

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app"

require('./scss');

class AppRender extends React.Component {
    render() {
        return (
            <App />
        )
    }
}

const root = createRoot(document.getElementById('react'));
root.render(<AppRender />);
