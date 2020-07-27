import React from 'react';
import ReactWebComponent from 'react-web-component';
// import { HelloPlugin } from './hello-plugin/hello-plugin';
import AddCommand from './mockCommand/command';


ReactWebComponent.create(<AddCommand />, 'mock-command-dep');