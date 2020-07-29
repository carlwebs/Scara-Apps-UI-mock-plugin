import React, { Component, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: () => void;
    addCommand: any;
}

function SimpleDialog(props: SimpleDialogProps) {
    const classes = useStyles();
    const { onClose, selectedValue, open, addCommand } = props;
    const [selectValue, setSelectValue] = useState('');

    const handleClose = () => {
        onClose();
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectValue(event.target.value as string);
        console.log(event.target.value);
    };

    const addMemberSave = () => {
        const cmd = `MEMDEL_DELETE(selectValue)`;
        addCommand.insertAndJump(cmd,0)
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">add command</DialogTitle>
            <FormControl className="addCommandForm">
                <InputLabel id="demo-simple-select-label">variable</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectValue}
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <div className="addCommandBtn">
                <Button variant="contained" color="primary" className="addCommandBtnInsert" onClick={handleClose}>
                    {intl.get('cancel')}
                </Button>
                <Button variant="contained" color="primary" onClick={addMemberSave}>
                    {intl.get('insert')}
                </Button>
            </div>
        </Dialog>
    );
}

function AddCommand() {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(emails[1]);
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
        getCustomEvent("addCommand",(value: any) => {
            setAddCommand(value.addCommand);
        })
    }, []);

    return (
        <div>
            <div onClick={handleClickOpen}>
                MEMDEL_DELETE
            </div>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} addCommand={addCommand}/>
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

