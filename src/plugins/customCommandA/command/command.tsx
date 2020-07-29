import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import intl from 'react-intl-universal';
import StringInput from '../commandConfig/stringInput';
import './command.css';
import { getCustomEvent } from '../../customEvent';

interface tableData {
    "sMemberName": string,
    "lMemberAge": string,
    "checked"?: boolean
}

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    addCommand: any;
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, open, addCommand } = props;
    const [selectedVar, setSelectVar] = useState('');
    const [variable, setVariable] = useState('');
    const [allVariable, setAllVariable] = useState<tableData[]>([]);
    const [ws, setWs] = useState<any>();


    const handleClose = (): void => {
        onClose();
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
        const selectVarName = event.target.value;
        setSelectVar(selectVarName as string);
        allVariable.forEach(element => {
            if (element.sMemberName === selectVarName) {
                setVariable(element.lMemberAge);
            }
        });
    };

    const addMemberSave = (): void => {
        const cmd = `MEMBER_UPDATE(selectedVar,variable)`;
        addCommand.insertAndJump(cmd, 0)
    }
    useEffect(() => {
        getCustomEvent("ws", (value: any) => {
            setWs(value.ws);
            value.ws.query("?MEMBER_UPDATE").then((result: any) => {
                const variableNames: tableData[] = [];
                const data = JSON.parse(result.result);
                data.forEach((element: tableData) => {
                    variableNames.push(element);
                });
                setAllVariable(variableNames);
            })
        })

    }, []);

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{intl.get('modifyVariable')}</DialogTitle>
            <FormControl className="addCommandForm">
                <InputLabel id="demo-simple-select-label">
                    {intl.get('variable')}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedVar}
                    onChange={handleChange}
                >
                    {allVariable.map((ele) => {
                        return <MenuItem value={ele.sMemberName} key={ele.sMemberName}>{ele.sMemberName}</MenuItem>
                    })}
                    {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
            </FormControl>
            <StringInput blur={(value: string, valid: boolean) => { }} value={variable}></StringInput>
            <div className="addCommandBtn">
                <Button variant="contained" color="primary" className="addCommandBtnInsert" onClick={onClose}>
                    {intl.get('cancel')}
                </Button>
                <Button variant="contained" color="primary" onClick={addMemberSave} disabled={!selectedVar || !variable}>
                    {intl.get('insert')}
                </Button>
            </div>
        </Dialog>
    );
}

function AddCommandComp() {
    const [open, setOpen] = useState(false);
    const [addCommand, setAddCommand] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        // document.addEventListener("addCommand",(e:any)=>{
        //     setAddCommand(e.detail.addCommand);
        // })
        getCustomEvent("addCommand", (value: any) => {
            setAddCommand(value.addCommand);
        })
    }, []);

    return (
        <div>
            <div onClick={handleClickOpen}>
                MEMBER_UPDATE
            </div>
            <SimpleDialog open={open} onClose={handleClose} addCommand={addCommand} />
        </div>
    );
}

export default class MockCommand extends React.Component {
    componentDidMount() {

    }
    render() {
        return <AddCommandComp />
    }
}
