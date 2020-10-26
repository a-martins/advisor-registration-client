import React from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.2rem"
        }
    }
}));

const AdvisorList = (props) => {
    const classes = useStyles();
    const { advisorsList } = props;

    return (
        <TableContainer>
            <Table>
                <TableHead className={classes.root}>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Mobile</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        advisorsList.map((record, index) => {
                            return (
                                <TableRow key={index} hover>
                                    <TableCell>{record.fullName}</TableCell>
                                    <TableCell>{record.email}</TableCell>
                                    <TableCell>{record.mobile}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdvisorList
