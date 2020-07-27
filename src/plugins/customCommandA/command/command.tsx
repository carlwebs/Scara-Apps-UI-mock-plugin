import React from 'react';
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
    onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
    const [age, setAge] = React.useState('');

    const handleClose = () => {
        onClose(age);
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">add command</DialogTitle>
            <FormControl className="addCommandForm">
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <div className="addCommandBtn">
                <Button variant="contained" color="primary" className="addCommandBtnInsert">
                    {intl.get('cancel')}
                </Button>
                <Button variant="contained" color="primary">
                    {intl.get('insert')}
                </Button>
            </div>
        </Dialog>
    );
}

function AddCommandComp() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };

    return (
        <div>
            <Typography variant="subtitle1"></Typography>
            <br />
            
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open simple dialog
            </Button>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
        </div>
    );
}

export default class MockCommand extends React.Component {
    render() {
        return <AddCommandComp />
    }
}
