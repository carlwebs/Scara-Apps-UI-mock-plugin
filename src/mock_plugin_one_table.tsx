import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import NumberInput from './number';
import { Button } from '@material-ui/core';
import intl from 'react-intl-universal';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

interface tableData {
    "sMemberName": string,
    "lMemberAge": string,
    "sMemberHobby": string,
    "lMemberScore": string,
    "checked"?: boolean
}


let initData: tableData[] = [

];

export default function MockPluginOneTable() {
    const classes = useStyles();
    const [rows, setRows] = useState(initData);
    const [checkAllBox, setCheckAll] = useState(false);
    useEffect(() => {
        let arrData: tableData[] = [
            { "sMemberName": "jack", "lMemberAge": '1', "sMemberHobby": "play", "lMemberScore": '100', "checked": true },
            { "sMemberName": "a", "lMemberAge": '2', "sMemberHobby": "play", "lMemberScore": '100', "checked": false },
            { "sMemberName": "b", "lMemberAge": '3', "sMemberHobby": "play", "lMemberScore": '100', "checked": true }
        ]
        setRows(arrData);
    }, []);
    function checkAll() {
        setCheckAll(!checkAllBox);
        rows.map((value) => {
            value.checked = !checkAllBox;
        })
        const rowsData = [...rows];
        setRows(rowsData);
    }
    function checkOne(row: tableData, index: number) {
        row.checked = !row.checked;
        const rowsData = [...rows];
        setRows(rowsData);
        const checkedNum = rows.filter((row) => {
            return row.checked;
        })
        setCheckAll(checkedNum.length === rows.length);
    }
    function blur(value: string) {
        console.log(rows)
    }
    function addMember(){
        setCheckAll(false);
        const defaultMember: tableData = { "sMemberName": "", "lMemberAge": '0', "sMemberHobby": "default", "lMemberScore": '0', "checked": false };
        const rowsData = [...rows,defaultMember];
        setRows(rowsData);
    }
    return (
        <div>
            <Button variant="contained" color="secondary">
                {intl.get('delete')}
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => { addMember() }}>
                {intl.get('create')}
            </Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox onChange={checkAll} checked={checkAllBox} />
                            </TableCell>
                            <TableCell>{intl.get('sMemberName')}</TableCell>
                            <TableCell align="right">{intl.get('lMemberAge')}</TableCell>
                            <TableCell align="right">{intl.get('sMemberHobby')}</TableCell>
                            <TableCell align="right">{intl.get('lMemberScore')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.sMemberName}>
                                <TableCell padding="checkbox">
                                    <Checkbox onChange={() => { checkOne(row, index) }} checked={row.checked} />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.sMemberName}--{index}
                                </TableCell>
                                <TableCell align="right">
                                    {/* <input type="text" value={row.lMemberAge} onChange={()=>modify(row.lMemberAge)}/> */}
                                    <NumberInput type='int' value={row.lMemberAge} blur={(value: string) => { blur(value); row.lMemberAge = value }} />
                                </TableCell>
                                <TableCell align="right">{row.sMemberHobby}</TableCell>
                                <TableCell align="right">
                                    <NumberInput type='int' value={row.lMemberScore} blur={(value: string) => { blur(value); row.lMemberScore = value }} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}