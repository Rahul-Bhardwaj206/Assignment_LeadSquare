import { Avatar, Box, Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';

const TicketCard = ({ ticketData }) => {
    const loadText = () => {
       return  ticketData.question ?
        <Typography color='secondary' component='div' className='flex flex-middle flex-space-between'>
        <Box fontSize={14} fontWeight="fontWeightMedium">{ticketData.user_addressed} <span className='text-muted'>{ticketData.second_heading}</span></Box>
        <Box fontSize={14} fontWeight="fontWeightMedium" className='text-muted'>{ticketData.time}</Box>
        </Typography>
        :
        <Typography color='secondary' component='div' className='flex flex-middle flex-space-between'>
        <Box fontSize={14} fontWeight="fontWeightMedium"><span className='text-muted'>{ticketData.user_addressed}</span> {ticketData.second_heading}</Box>
        <Box fontSize={14} fontWeight="fontWeightMedium" className='text-muted'>{ticketData.time}</Box>
        </Typography>
    }
    return (
        <Card variant="outlined">
            <CardHeader
                avatar={
                    <Avatar aria-label={ticketData.user_addressed} src={ticketData.profile_pic} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={<Typography component="div"> <Box fontSize={14} fontWeight="fontWeightMedium">{ticketData.subject}</Box></Typography>}
                subheader={loadText()}
            />
            <CardContent>
                {ticketData.content.map((item, index) => <Typography variant="body2" component="p" key={index}>
                    {item}
                </Typography>)}

            </CardContent>
        </Card>
    )
}

export default React.memo(TicketCard)