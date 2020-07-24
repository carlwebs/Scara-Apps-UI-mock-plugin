import React from 'react';
import ReactWebComponent from 'react-web-component';
import MockPluginOne from './mock-plugin/mock_plugin_one';
import MockCommand from './command/command';

ReactWebComponent.create(<MockCommand />, 'mock-command', false);
ReactWebComponent.create(<MockPluginOne />, 'mock-plugin', false);