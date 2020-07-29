import React from 'react';
import ReactWebComponent from 'react-web-component';
import MockCommand from './command/command';
import MockPluginOne from './commandConfig/mockPluginOne';
import PluginIcon from './commandConfigEntry/pluginIcon';
import initLanguage from '../initLanguage';
import { getCustomEvent } from '../customEvent';
getCustomEvent("changeLanguage",(value: any) => {
    initLanguage();

})
initLanguage();
ReactWebComponent.create(<MockCommand />, 'mock-command', false);
ReactWebComponent.create(<MockPluginOne />, 'mock-plugin', false);
ReactWebComponent.create(<PluginIcon />, 'plugin-icon', false);