import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200,
            },
        },
    }),
);

export default function NumberInput(props: any) {
    const classes = useStyles();
    const [valid, setValid] = useState(false);
    const [value, setValue] = useState(props.value || '');
    function change(event: any) {
        event.persist();
        let originalVal = event.target.value;
        const firstOne = originalVal.trim()[0] === '-' ? '-' : '';
        const type = props.type || 'float';
        setTimeout(() => {
            if (type === 'float') {
                const validStr = originalVal.replace(/[^0-9|.]+/g, '').replace('.', '*').replace(/[.]/g, '').replace('*', '.');
                const indexOfNotZero = [...validStr].findIndex(n => n !== '0');
                const slicedString = validStr.slice(indexOfNotZero);
                const correctedStr = slicedString[0] === '.' ? `0${slicedString}` : slicedString;
                const finalString = `${firstOne}${correctedStr}`;
                setValue(finalString);
            } else if (type === 'int') {
                const validStr = originalVal.replace(/[^0-9]+/g, '');
                if (validStr !== '0') {
                    const indexOfNotZero = [...validStr].findIndex(n => n !== '0');
                    const slicedString = validStr.slice(indexOfNotZero);
                    setValue(`${firstOne}${slicedString}`);
                } else {
                    setValue(`${firstOne}${validStr}`);
                }
            }
        }, 20);
        return false;
    }
    function blurs() {
        props.blur(value);
    }

    useEffect(() => {

    })

    return (
        <form className={classes.root} autoComplete="off">
            <div>
                <TextField
                    error={valid}
                    label="num"
                    onChange={change}
                    onBlur={blurs}
                    value={value}
                    // defaultValue="Hello World"
                    helperText="error信息"
                />
            </div>
        </form>
    );
}
