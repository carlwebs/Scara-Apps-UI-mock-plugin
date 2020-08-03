import React from 'react';
import { PluginCommandAEntryFunc } from './commandEntry/entry';
import defineCustomElement from '../../webComponentCreator';

defineCustomElement(<PluginCommandAEntryFunc />, 'plugin-command-a-entry', ['clickEvent']);