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
import { getCustomEvent } from '../../customEvent';
import "./mockPluginOneTable.css";

interface tableData {
    "sMemberName": string,
    "sMemberAge": string,
    "checked"?: boolean
}


let initData: tableData[] = [

];

export default function MockPluginOneTable() {
    const [rows, setRows] = useState(initData);
    const [existNames, setExistNames] = useState<string[]>([]);
    const [checkAllBox, setCheckAll] = useState(false);
    const [addMemberStatus, setAddMemberStatus] = useState(false);
    const [ws, setWs] = useState<any>();
    useEffect(() => {
        getCustomEvent("ws", (value: any) => {
            setWs(value.ws);
            update(value.ws);
        })
        // let arrData: tableData[] = [
        //     { "sMemberName": "aa", "sMemberAge": '1', "checked": false },
        //     { "sMemberName": "bb", "sMemberAge": '1', "checked": false },
        //     { "sMemberName": "cc", "sMemberAge": '1', "checked": false },
        // ]
    }, []);

    const update = (ws: any) => {
        ws.query("?MEMBER_UPDATE").then((result: any) => {
            const exist: string[] = [];
            const data = JSON.parse(result.result);
            data.forEach((element: tableData) => {
                element.checked = false;
                exist.push(element.sMemberName);
            });
            setRows(data);
            setExistNames(exist);
        })
    }

    const checkAll = () => {
        setCheckAll(!checkAllBox);
        rows.map((value) => {
            value.checked = !checkAllBox;
        })
        setRows([...rows]);
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
            if (valid || row.sMemberName === "") {
                rows.splice(index, 1);
                setRows([...rows]);
                return;
            }
            // 新建状态
            ws.query(`?MEMBER_CREAT("${row.sMemberName}")`);
            setExistNames([...existNames, row.sMemberName]);
        } else {
            // 修改状态
            ws.query(`?MEMBER_SAVE("${row.sMemberName}","${row.sMemberAge}")`);
        }
        existNames[index] = row.sMemberName;
        setExistNames([...existNames]);
    }
    const addMember = () => {
        setAddMemberStatus(true);
        setCheckAll(false);
        const defaultMember: tableData = { "sMemberName": "", "sMemberAge": '1', "checked": false };
        setRows([...rows, defaultMember]);
    }
    const deletBtn = () => {
        const checkedNum = rows.filter((row) => {
            return row.checked;
        })
        return checkedNum.length;
    }
    const deleteItem = () => {
        rows.forEach((row) => {
            setExistNames(existNames.filter((item) => {
                return item !== row.sMemberName;
            }));
        })
        const selectRow = rows.filter((item) => {
            return item.checked;
        })
        selectRow.forEach((row) => {
            ws.query(`?MEMBER_DELETE_ROW("${row.sMemberName}")`).then((result: any) => {
                if (row.sMemberName === selectRow[selectRow.length - 1].sMemberName) {
                    update(ws);
                }
            })
        })
    }
    return (
        <div>
            <div className="btnBox">
                <Button variant="contained" color="secondary" onClick={() => { deleteItem() }} disabled={deletBtn() === 0}>
                    {intl.get('delete')}
                </Button>
                <Button
                    disabled={rows.length === 10}
                    variant="contained"
                    color="primary"
                    onClick={() => { addMember() }}>
                    {intl.get('create')}
                </Button>
            </div>
            <TableContainer component={Paper} className="tablesContain">
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox onChange={checkAll} checked={checkAllBox} />
                            </TableCell>
                            <TableCell align="center">{intl.get('VariableName')}</TableCell>
                            <TableCell align="center">{intl.get('VariableValue')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.sMemberName}>
                                <TableCell padding="checkbox">
                                    <Checkbox onChange={() => { checkOne(row, index) }} checked={row.checked} />
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    <StringInput autoFocus={(row.sMemberName === "" && addMemberStatus) ? true : false} disabled={(row.sMemberName === "" && addMemberStatus) ? false : true} value={row.sMemberName} blur={(value: string, valid: boolean) => { row.sMemberName = value; blur(row, index, valid) }} existNames={existNames} />
                                </TableCell>
                                <TableCell align="center">
                                    <StringInput value={row.sMemberAge} blur={(value: string, valid: boolean) => { row.sMemberAge = value; blur(row, index, valid) }} disabled={false} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}