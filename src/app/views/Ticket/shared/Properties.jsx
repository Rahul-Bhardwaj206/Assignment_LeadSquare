import { Box, Button, Card, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { loadPropertiesData } from 'app/camunda_redux/redux/action/index'
import { connect, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import DropDownComponent from './DropDownComponent';
import { setSnackbar } from 'app/camunda_redux/redux/ducks/snackbar';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    cardHeight: {
        height: '85vh'
    },
    button: {
        borderTopRightRadius: '24px',
        borderBottomRightRadius: '24px',
        borderTopLeftRadius: '24px',
        borderBottomLeftRadius: '24px'
    }
}));

const Properties = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation()
    const [type, setType] = useState("Question")
    const [status, setStatus] = useState("Open")
    const [priority, setPriority] = useState("Medium")
    const [assignTo, setAssignTo] = useState("John")
    const [data, setData] = useState([])

    const callMessageOut = (message) => {
        dispatch(setSnackbar(true, "error", message));
    }

    const loadPropertiesData = useCallback(() => { // loading data from API for all the dropdown
        setData([])
        props.loadPropertiesData()
            .then(resp => {
                !resp.error ? setData(resp[0]) : callMessageOut("Properties : There is some issue with api call")
            }).catch(error => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        loadPropertiesData()
    }, [])

    return (
        <Card className={`p-8 ${classes.cardHeight}`} variant="outlined">
            <Typography component="div"> <Box fontSize={16} fontWeight="fontWeightMedium" ml={1} className='mt-12'>{t("title_properties")}</Box></Typography>
            <DropDownComponent lable={`${t("lbl_type")}`} setValue={useCallback((e) => setType(e),[])} data={data && data.type} value={type} />
            <DropDownComponent lable={`${t("lbl_status")}`} setValue={useCallback((e) => setStatus(e),[])} data={data && data.status} value={status} />
            <DropDownComponent lable={`${t("lbl_priority")}`} setValue={useCallback((e) => setPriority(e),[])} data={data && data.priority} value={priority} />
            <DropDownComponent lable={`${t("lbl_AssignTo")}`} setValue={useCallback((e) => setAssignTo(e),[])} data={data && data.assignedTo} value={assignTo} />
            <Box className='pt-32 text-center'>
                <Button variant="contained" color="secondary" disableElevation className={classes.button}>
                    {t("btn_update")}
                </Button>
            </Box>
        </Card>
    )
}

function mapStateToProps(state) {
    return {
        props: state.props,
    };
}
export default connect(mapStateToProps, { loadPropertiesData })(Properties)