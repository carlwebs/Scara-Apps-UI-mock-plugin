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
import StringInput from './stringInput';
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
    "checked"?: boolean
}


let initData: tableData[] = [

];

export default function MockPluginOneTable() {
    const classes = useStyles();
    const [rows, setRows] = useState(initData);
    const [existNames, setExistNames] = useState<string[]>(["a"]);
    const [checkAllBox, setCheckAll] = useState(false);
    const [addMemberStatus, setAddMemberStatus] = useState(false);
    const [ws, setWs] = useState<any>();
    useEffect(() => {
        let arrData: tableData[] = [
            { "sMemberName": "aa", "lMemberAge": '1', "checked": false },
            { "sMemberName": "bb", "lMemberAge": '1', "checked": false },
            { "sMemberName": "cc", "lMemberAge": '1', "checked": false },
        ]
        // 获取数据
        // ws.query("?MEMBER_UPDATE").then((result:any)=>{
        //     console.log(result);
        // })
        setRows(arrData);
    }, []);
    const checkAll = () => {
        setCheckAll(!checkAllBox);
        rows.map((value) => {
            value.checked = !checkAllBox;
        })
        const rowsData = [...rows];
        setRows(rowsData);
    }
    const checkOne = (row: tableData, index: number) => {
        row.checked = !row.checked;
        setRows([...rows]);
        const checkedNum = rows.filter((row) => {
            return row.checked;
        })
        setCheckAll(checkedNum.length === rows.length);
    }
    const blur = (row: tableData, index: number, valid?: boolean) => {
        if (addMemberStatus) {
            setAddMemberStatus(false);
            if (valid) {
                rows.splice(index,1);
                setRows([...rows]);
                return;
            }
            // 新建状态
            // ws.query(`?MEMBER_CREAT("${row.sMemberName}")`).then((result:any)=>{
            //     console.log(result);
            // })
        } else {
            // 修改状态
            // ws.query(`?MEMBER_SAVE("${row.sMemberName}","${row.lMemberAge}")`).then((result:any)=>{
            //     console.log(result);
            // })
        }
        existNames[index] = row.sMemberName;
        setExistNames([...existNames]);
    }
    function addMember() {
        setAddMemberStatus(true);
        setCheckAll(false);
        const defaultMember: tableData = { "sMemberName": "", "lMemberAge": '1', "checked": false };
        // const rowsData = [...rows,defaultMember];
        setRows([...rows, defaultMember]);
    }
    function deleteItem() {
        rows.forEach((row) => {
            // ws.query(`?MEMBER_DELETE("${row.sMemberName}","${row.lMemberAge}")`).then((result:any)=>{
            //     console.log(result);
            // })
        })
    }
    return (
        <div>
            <Button variant="contained" color="secondary" onClick={() => { deleteItem() }}>
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
                            <TableCell>{intl.get('VariableName')}</TableCell>
                            <TableCell align="left">{intl.get('VariableValue')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.sMemberName}>
                                <TableCell padding="checkbox">
                                    <Checkbox onChange={() => { checkOne(row, index) }} checked={row.checked} />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <StringInput autoFocus={(row.sMemberName === "" && addMemberStatus) ? true : false} disabled={(row.sMemberName === "" && addMemberStatus) ? false : true} value={row.sMemberName} blur={(value: string, valid: boolean) => { row.sMemberName = value; blur(row, index, valid) }} existNames={existNames} />
                                </TableCell>
                                <TableCell align="left">
                                    <StringInput value={row.lMemberAge} blur={(value: string, valid: boolean) => { row.lMemberAge = value; blur(row, index, valid) }} disabled={false} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}