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
    "sMemberAge": string,
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
    const [theme, setTheme] = useState('');


    const handleClose = (): void => {
        onClose();
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
        const selectVarName = event.target.value;
        setSelectVar(selectVarName as string);
        allVariable.forEach(element => {
            if (element.sMemberName === selectVarName) {
                setVariable(element.sMemberAge);
            }
        });
    };

    const addMemberSave = (): void => {
        const cmd = `MemberSave("${selectedVar}","${variable}")`;
        addCommand.insertAndJump(cmd, 0);
        onClose();
    }

    const changeVariable = (e: any): void => {
        e.persist();
        let originalVal = e.target.value;
        setTimeout(() => {
            const valueData = originalVal.replace(/[^a-z|A-Z|0-9|_]+/g, '').slice(0,32);
            setVariable(valueData);
        }, 20);
    }

    useEffect(() => {
        setTheme(localStorage.getItem("theme") || "kuka");
        getCustomEvent("changeTheme", (value: any) => {
            setTheme(value.theme);
        })
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
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className={theme}>
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
                    {/* <MenuItem value={32}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
            </FormControl>
            {/* <StringInput blur={(value: string, valid: boolean) => { }} value={variable}></StringInput> */}
            <input type="text" maxLength={32} value={variable} className="commandVariable" placeholder={intl.get('VariableValue')} onChange={($event) => {changeVariable($event)}} />
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
        getCustomEvent("addCommand", (value: any) => {
            setAddCommand(value.addCommand);
        })
    }, []);

    return (
        <div>
            <div onClick={handleClickOpen}>
                MemberSave
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
