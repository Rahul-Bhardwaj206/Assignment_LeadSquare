import { Box, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { memo } from 'react'

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: '100%',
    }
}))

const DropDownComponent = ({lable, setValue, data, value}) => {
    const classes = useStyles()
    return (
        <Box className='pt-32'>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="outlined-priority">{lable}</InputLabel>
                <Select
                    value={value}
                    onChange={e => setValue(e.target.value)}
                >
                    {data && data.map((item, index) => <MenuItem value={item.value} key={index}>{item.value}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(DropDownComponent)