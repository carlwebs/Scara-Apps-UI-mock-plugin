import React, { Component } from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import './entry.css';

function HomeIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

export class PluginCommandAEntry extends Component {
    props: any;
    constructor(props: any) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    webComponentConnected() {
        // will be called when the Web Component has been attached
        console.log('webComponentConnected');
    }

    clickHandler() {
        this.props.clickEvent('Click me', (e: string) => {
            console.log('Cached callback fn with: ', e);
        });
    }
    
    render() {
        return (
            <div className="addPluginIcon" onClick={this.clickHandler}>
                <HomeIcon color="primary" />
                <div className="variable">PluginCommandPras; {this.props.name}</div>
            </div>
        );
    }
}
