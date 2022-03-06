import { Box, Button, Card, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import DropDownComponent from './DropDownComponent';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    cardHeight: {
        height: '85vh'
    }
}));

const ContactDetail = ({ data }) => {
    const classes = useStyles();
    const { t } = useTranslation()
    const [timelog, setTimelog] = React.useState('');
    const [todo, setTodo] = React.useState('');
    return (
        <Card className={`p-8 ${classes.cardHeight}`} variant="outlined">
            <Typography component="div"> <Box fontSize={16} fontWeight="fontWeightMedium" m={1}>{t("Contact_Details")}<Button color="secondary">{t("btn_edit")}</Button></Box></Typography>
            {data && <Box className='flex'>
                <img
                    className="big-rectangle-box"
                    src={process.env.PUBLIC_URL + "/assets/images/face-1.jpg"}
                    alt="user"
                />
                <Typography component="div"><Box fontSize={14} fontWeight="fontWeightMedium" m={1}>{`${data.first_name} ${data.last_name}`}</Box></Typography>
            </Box>}
            <Box className='pt-16'>
                <Typography component="div">
                    <Box fontSize={14} fontWeight="fontWeightMedium" m={1}>{t("lbl_email")}</Box>
                    <Box fontSize={14} m={1} className='text-muted'>{data && data.email}</Box>
                </Typography>
            </Box>
            <Box className='pt-24'>
                <Typography component="div">
                    <Box fontSize={14} fontWeight="fontWeightMedium" m={1}>{t("lbl_workphone")}</Box>
                    <Box fontSize={14} m={1} className='text-muted'>{data && data.contact}</Box>
                </Typography>
            </Box>
            <DropDownComponent lable={`${t("lbl_timelog")}`} setValue={useCallback((e) => setTimelog(e), [])} data={data && data.timeLog} value={timelog} />
            <DropDownComponent lable={`${t("lbl_todo")}`} setValue={useCallback((e) => setTodo(e), [])} data={data && data.Todo} value={todo} />
        </Card>
    )
}

export default ContactDetail