import React from 'react';
import ReactWebComponent from 'react-web-component';
import { HelloPlugin } from './helloPlugin/hello-plugin';


ReactWebComponent.create(<HelloPlugin />, 'hello-plugin1', false);