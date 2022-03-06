import { Box, Button, ButtonGroup, Card, Grid, Menu, MenuItem, Typography } from '@material-ui/core'
import { Breadcrumb } from 'shared_component'
import React, { useEffect } from 'react'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import ReplyAllOutlinedIcon from '@material-ui/icons/ReplyAllOutlined';
import DescriptionIcon from '@material-ui/icons/Description';
import ForwardIcon from '@material-ui/icons/Forward';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import TicketCard from './Ticket_Card';
import { loadTickets } from 'app/camunda_redux/redux/action/index'
import { connect, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setSnackbar } from 'app/camunda_redux/redux/ducks/snackbar';

const options = [
    'Forward All',
    'Report',
    'Archieve'
]
const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
    cardBg: {
        // background:'ghostwhite'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}))

const Tickets = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const { t } = useTranslation()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [data, setData] = React.useState([])
    const open = Boolean(anchorEl)
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const callMessageOut = (message) => {
        dispatch(setSnackbar(true, "error", message));
    }

    const loadAllTickets = () => {
        setData([])
        props.loadTickets()
            .then(resp => {
                !resp.error && resp.length > 0 ? setData(resp) : callMessageOut("Tickets : There is some issue with api call")
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        loadAllTickets()
    }, [])


    return (
        <Card className={`p-8 ${classes.cardBg}`} variant="outlined">
            <Typography component="div"> <Box fontSize="h6.fontSize" fontWeight="fontWeightMedium" mt={1}>{t("title_ticket")}</Box></Typography>
            {data.length > 0 && <Grid container justifyContent="center" spacing={1}>
                <Grid item xs={4}>
                    <Breadcrumb
                        routeSegments={[
                            { name: `${t("title_ticket")}`, path: "/personnel/file", detail: `${t("breadcrum_detail")}` }
                        ]}
                    />
                </Grid>
                <Grid item xs={8}></Grid>
            </Grid>}
            <Grid container justifyContent='center' className='mt-16'>
                <Grid item xs={12} className="flex flex-middle position-relative">
                    <Button variant="outlined" size='small'><StarBorderOutlinedIcon fontSize='small' /></Button>
                    <ButtonGroup size='small'>
                        <Button startIcon={<ReplyAllOutlinedIcon />}>{t("btn_reply")}</Button>
                        <Button startIcon={<DescriptionIcon />}>{t("btn_AddNote")}</Button>
                        <Button startIcon={<ForwardIcon />}>{t("btn_Forward")}</Button>
                        <Button startIcon={<CheckCircleOutlineIcon />}>{t("btn_close")}</Button>
                        <Button startIcon={<MergeTypeIcon />}>{t("btn_merge")}</Button>
                        <Button startIcon={<DeleteOutlineIcon />}>{t("btn_delete")}</Button>
                    </ButtonGroup>
                    <Button
                        aria-haspopup="true"
                        onClick={handleClick}
                        variant="outlined"
                        size='small'
                    >
                        <MoreVertIcon />
                    </Button>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        {options.map((option) => (
                            <MenuItem key={option} onClick={handleClose}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </Grid>
            </Grid>
            <Grid container justifyContent='center'>
                {data.map((item, index) =>
                    <Grid item xs={12} className='mt-8' key={index}>
                        <TicketCard ticketData={item} />
                    </Grid>
                )}
            </Grid>
        </Card>
    )
}

function mapStateToProps(state) {
    return {
        props: state.props,
    };
}

export default connect(mapStateToProps, { loadTickets })(Tickets)