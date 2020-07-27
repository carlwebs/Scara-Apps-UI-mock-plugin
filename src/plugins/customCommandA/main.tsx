import React from 'react';
import ReactWebComponent from 'react-web-component';
import MockCommand from './command/command';
import MockPluginOne from './commandConfig/mockPluginOne';
import PluginIcon from './commandConfigEntry/pluginIcon';

ReactWebComponent.create(<MockCommand />, 'mock-command', false);
ReactWebComponent.create(<MockPluginOne />, 'mock-plugin', false);
ReactWebComponent.create(<PluginIcon />, 'plugin-icon', false);