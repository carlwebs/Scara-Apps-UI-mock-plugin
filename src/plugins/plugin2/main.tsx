import React from 'react';
import ReactWebComponent from 'react-web-component';
// import { HelloPlugin } from './hello-plugin/hello-plugin';
import MockPluginOne from './mock-plugin/mock_plugin_one';


ReactWebComponent.create(<MockPluginOne />, 'mock-plugin');