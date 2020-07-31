import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const tabKey = 'simple-tab-';
const tabPanelKey = 'simple-tabpanel-';

function TabPanel(props: { index: number, value: number, children: string }) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`${tabPanelKey}${index}`}
            aria-labelledby={`${tabKey}${index}`}
            {...other}>
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `${tabKey}${index}`,
        'aria-controls': `${tabPanelKey}${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabContainer: {
        display: 'flex',
        // flexdirection: 'row',
        // justifyContent: 'spaceBetween'
    }
}));

export default function MainView(props: any): JSX.Element {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.tabContainer}>
                <Tab label="Standard View" {...a11yProps(0)} />
                <Tab label="Custom View 1" {...a11yProps(1)} />
                <Tab label="Custom View 2" {...a11yProps(2)} />
                {/* <ButtonGroup disableElevation color="primary">
                    <Button color="secondary" startIcon={<AddIcon />}> Add </Button>
                    <Button color="secondary" startIcon={<DeleteIcon />}> Delete </Button>
                </ButtonGroup> */}
            </Tabs>
            <TabPanel value={value} index={0}> Standard view panel </TabPanel>
            <TabPanel value={value} index={1}> Custom view panel </TabPanel>
            <TabPanel value={value} index={2}> Custom view panel </TabPanel>
        </div>
    );
}
