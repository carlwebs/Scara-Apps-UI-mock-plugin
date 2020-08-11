import React, { Component } from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import './pluginIcon.css';
import { getCustomEvent } from '../../customEvent';
import intl from 'react-intl-universal';


function HomeIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

function SvgIconsColor(props:any) {

    return (
        <div className="addPluginIcon" style={props.state=='true'?{color:'rgba(16, 16, 16, 0.3)'}:{}}>
            <HomeIcon color="primary"/>
            <div className="variable">{intl.get('mockPlugin')}</div>
        </div>
    );
}

export default class PluginIcon extends Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            router: ''
        }
    }
    componentDidMount() {
        getCustomEvent("router", (router: any) => {
            this.setState({
                "router": router
            })
        })
    }
    render() {
        return (
            <div>
                <SvgIconsColor state={this.props.state}></SvgIconsColor>
            </div>
        )
    }
}