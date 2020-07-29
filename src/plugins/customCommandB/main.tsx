import React from 'react';
import ReactWebComponent from 'react-web-component';
import AddCommand from './mockCommand/command';
import initLanguage from '../initLanguage';
import { getCustomEvent } from '../customEvent';
getCustomEvent("changeLanguage", (value: any) => {
    initLanguage();

})
initLanguage();

ReactWebComponent.create(<AddCommand />, 'mock-command-delete', false);