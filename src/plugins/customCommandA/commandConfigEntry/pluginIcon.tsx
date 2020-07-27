import React, { Component } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import './pluginIcon.css';

function HomeIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

function pluginElement(){
    document.dispatchEvent(new CustomEvent("plugin",{
        "detail":{
            "pluginElement": "mock-plugin"        }
    }))
}

function SvgIconsColor() {

    return (
        <div className="addPluginIcon" onClick={pluginElement}>
            <HomeIcon color="primary" />
            <div className="variable">AddVariable</div>
        </div>
    );
}

export default class PluginIcon extends Component {
    render() {
        return <SvgIconsColor></SvgIconsColor>
    }
}