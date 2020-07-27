import React, { Component } from 'react'
import intl from 'react-intl-universal';
import MockPluginOneTable from './mockPluginOneTable'
const locales = {
    "en-US": require('../../../locales/en-US.json'),
    "zh-CN": require('../../../locales/zh-CN.json'),
};

interface stateType {
    initDone: boolean,
    lang: string
}

export default class MockPluginOne extends Component<any, stateType> {
    constructor(props: any) {
        super(props);
        this.state = { initDone: false, lang: localStorage.getItem('lang') || 'en-US' };
    }
    componentDidMount() {
        this.loadLocales();
    }
    loadLocales() {
        intl.init({
            currentLocale: (this.state.lang === 'en') ? 'en-US' : 'zh-CN', // TODO: determine locale here
            locales,
        })
            .then(() => {
                this.setState({ initDone: true });
            });
    }
    render() {
        return (
            <div>
                <MockPluginOneTable />
            </div>
        )
    }
}
