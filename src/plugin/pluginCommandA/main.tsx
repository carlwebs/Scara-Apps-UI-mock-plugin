import React from 'react';
import { PluginCommandAEntry } from './commandEntry/entry';
import createCustomElement from '../../webComponentCreator';

createCustomElement(<PluginCommandAEntry />, 'plugin-command-a-entry', ['clickEvent']);