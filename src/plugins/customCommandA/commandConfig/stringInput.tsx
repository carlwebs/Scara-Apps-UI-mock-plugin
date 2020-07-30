import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './stringInput.css';
import Input from '@material-ui/core/Input';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import intl from 'react-intl-universal';


export default function StringInput(props: any) {
    const [valid, setValid] = useState(false);
    const [value, setValue] = useState(props.value || '');
    const [maxLength, setMaxLength] = useState(props.maxLeng || 6);
    const [existNames, setExistName] = useState(props.existNames || []);

    function change(event: any) {
        event.persist();
        let originalVal = event.target.value;
        const propsValue = props.value || '';
        setTimeout(() => {
            const valueData = originalVal.replace(/[^a-z|A-Z|0-9|_]+/g, '');
            setValue(valueData.slice(0, maxLength));
            if (existNames.includes(valueData) && propsValue !== valueData) {
                // 名称已存在
                setValid(true);
            } else {
                setValid(false);
            }
        }, 20);
        return false;
    }

    return (
        <form noValidate autoComplete="off">
            <div>
                <TextField
                    autoFocus={props.autoFocus}
                    disabled={props.disabled}
                    onChange={change}
                    value={value}
                    error={valid}
                    id="standard-error-helper-text"
                    onBlur={() => { props.blur(value, valid) }}
                    helperText={valid ? intl.get('existName') : ""}
                />
            </div>
        </form>
    );
}
