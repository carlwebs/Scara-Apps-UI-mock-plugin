import './hello-plugin.css'
import React from 'react';

export class HelloPlugin extends React.Component {
    render() {
        return (
            <div>
                <h1 className="hello-plugin">Hello Plugin1!</h1>
                {/* <common-button></common-button> */}
            </div>
        );
    }
}
