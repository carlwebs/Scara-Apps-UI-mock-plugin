import React from 'react';
import { PluginCommandAEntryFunc, PluginCommandAEntry } from './commandEntry/entry';
import createCustomElement from '../../webComponentCreator';

createCustomElement(<PluginCommandAEntryFunc />, 'plugin-command-a-entry', ['clickEvent']);