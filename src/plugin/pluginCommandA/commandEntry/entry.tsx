import React, { Component, useState } from 'react';
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
    state: any;
    constructor(props: any) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
        this.state = { value: 'click me' };
    }

    connectedCallback() {
        // will be called when the Web Component has been attached
        console.log('connectedCallback');
    }

    clickHandler() {
        this.props.clickEvent('Click me', (res: string) => {
            console.log('Cached callback fn with: ', res);
            this.setState({ value: res });
        });
    }

    render() {
        return (
            <div className="addPluginIcon" onClick={this.clickHandler}>
                <HomeIcon color="primary" />
                <div className="variable">PluginCommandPras; {this.state.value}</div>
            </div>
        );
    }
}

export function PluginCommandAEntryFunc(props: any) {
    const [value, setValue] = useState('click me');

    function clickHandler(): void {
        props.clickEvent('Click me', (res: string) => setValue(res));
    };

    return (
        <div className="addPluginIcon" onClick={clickHandler}>
            <HomeIcon color="primary" />
            <div className="variable">PluginCommandPras; {value}</div>
        </div>
    );
};
