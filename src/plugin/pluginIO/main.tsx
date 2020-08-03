import React from 'react';
import defineCustomElement from '../../webComponentCreator';
import MainView from './mainView/mainView';

defineCustomElement(<MainView />, 'plugin-io-main-view', []);