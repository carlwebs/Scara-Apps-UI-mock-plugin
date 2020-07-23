import React, { Component } from 'react'
import { Box, Button } from '@material-ui/core'
import ReactWebComponent from 'react-web-component';
import SimpleTable from './materialTable';
import intl from 'react-intl-universal';

export default class MaterialTableClassDemo extends Component {
    render() {
        return (
            <div>
                <SimpleTable></SimpleTable>
                <div>---</div>
                <div>{intl.get('SIMPLE')}</div>
            </div>
        )
    }
}
ReactWebComponent.create(<MaterialTableClassDemo />, 'material-table-class',false);
