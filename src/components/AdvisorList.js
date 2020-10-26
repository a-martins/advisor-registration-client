import React from 'react'
import { connect } from 'react-redux'
import { useToasts } from 'react-toast-notifications'

import * as actions from '../actions/advisor'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    makeStyles,
    ButtonGroup,
    Button
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.2rem"
        }
    }
}));

const AdvisorList = (props) => {
    const classes = useStyles();
    const { setCurrentId } = props;
    const { addToast } = useToasts()

    const onDelete = (id) => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteAdvisor(id, () => addToast("Deleted successfully", { appearance: 'info' }))
    }

    return (
        <TableContainer>
            <Table>
                <TableHead className={classes.root}>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Mobile</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.advisorsList.map((record, index) => {
                            const { id, fullName, email, mobile } = record
                            return (
                                <TableRow key={index} hover>
                                    <TableCell>{fullName}</TableCell>
                                    <TableCell>{email}</TableCell>
                                    <TableCell>{mobile}</TableCell>
                                    <TableCell>
                                        <ButtonGroup variant="text">
                                            <Button onClick={() => setCurrentId(id)}><EditIcon color="primary" /></Button>
                                            <Button onClick={() => onDelete(id)}><DeleteIcon color="secondary" /></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const mapStateToProps = state => ({
    advisorsList: state.advisor.list
})

const mapActionToProps = {
    deleteAdvisor: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(AdvisorList)
