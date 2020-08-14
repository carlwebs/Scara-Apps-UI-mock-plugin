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

function SvgIconsColor(props: any) {

    return (
        <div id="addPluginId" className={props.className}>
            <div className="addPluginIcon" style={props.state == 'true' ? { color: 'rgba(16, 16, 16, 0.3)' } : {}}>
                <HomeIcon color="primary" />
                <div className="variable">{intl.get('mockPlugin')}</div>
            </div>
        </div>
    );
}

export default class PluginIcon extends Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            router: '',
            className: ''
        }
    }
    componentDidMount() {
        getCustomEvent("router", (router: any) => {
            this.setState({
                "router": router
            })
        })
        getCustomEvent("changeProject", (value: any) => {
            this.setState({
                "className": value.className
            })
        })
    }
    changeProject() {
        this.setState({
            "className": "pluginSelected"
        })
    }
    render() {
        return (
            <div onClick={() => {this.changeProject()}}>
                <SvgIconsColor state={this.props.state} className={this.state.className}></SvgIconsColor>
            </div>
        )
    }
}