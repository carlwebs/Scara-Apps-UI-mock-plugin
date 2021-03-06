import React, { Component, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import intl from 'react-intl-universal';
import './command.css';
import { getCustomEvent } from '../../customEvent';
// import '../../theme.css'

interface tableData {
    "sMemberName": string,
    "sMemberAge": string
}

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: () => void;
    addCommand: any;
    variableNames: string[];
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open, addCommand, variableNames } = props;
    const [selectValue, setSelectValue] = useState('');
    const [theme, setTheme] = useState('');

    const handleClose = () => {
        onClose();
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectValue(event.target.value as string);
        console.log(event.target.value);
    };

    const addMemberSave = () => {
        const cmd = `MemdelDelete("${selectValue}")`;
        addCommand.insertAndJump(cmd, 0);
        onClose();
    }

    useEffect(() => {
        setTheme(localStorage.getItem("theme") || "kuka");
    }, []);

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className={theme}>
            <DialogTitle id="simple-dialog-title">{intl.get('deleteVariable')}</DialogTitle>
            <FormControl className="addCommandForm">
                <InputLabel id="demo-simple-select-label">variable</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectValue}
                    onChange={handleChange}
                >
                    {variableNames.map((ele) => {
                        return <MenuItem value={ele} key={ele}>{ele}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <div className="addCommandBtn">
                <Button variant="contained" color="primary" className="addCommandBtnInsert" onClick={handleClose}>
                    {intl.get('cancel')}
                </Button>
                <Button variant="contained" color="primary" onClick={addMemberSave} disabled={!selectValue}>
                    {intl.get('insert')}
                </Button>
            </div>
        </Dialog>
    );
}

function AddCommand() {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [addCommand, setAddCommand] = useState();
    const [ws, setWs] = useState<any>();
    const [variableNames, setVariableNames] = useState<string[]>([]);

    const handleClickOpen = ($event: any) => {
        if(!$event.target.parentNode.parentNode.parentNode.classList.contains('disable')) {
            setOpen(true);
        }else {
            $event.stopPropagation();
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getCustomEvent("addCommand", (value: any) => {
            setAddCommand(value.addCommand);
        })
        getCustomEvent("ws", (value: any) => {
            setWs(value.ws);
            value.ws.query("?MEMBER_UPDATE").then((result: any) => {
                const member: string[] = [];
                const data = JSON.parse(result.result);
                data.forEach((element: tableData) => {
                    member.push(element.sMemberName);
                });
                setVariableNames(member);
            })
        })
    }, []);

    return (
        <div>
            <div onClick={handleClickOpen} className="command">
                MemdelDelete
            </div>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} addCommand={addCommand} variableNames={variableNames} />
        </div>
    );
}


export default class AddCommandClass extends Component {
    render() {
        return (
            <div>
                <AddCommand />
            </div>
        );
    }
}

