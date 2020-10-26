import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions/advisor'

import AdvisorForm from './AdvisorForm'
import AdvisorList from './AdvisorList'

import {
    Grid,
    Paper,
    withStyles
} from '@material-ui/core'

const styles = theme => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const AdvisorsList = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllAdvisors();
        //eslint-disable-next-line
    }, [])

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <AdvisorForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <AdvisorList {...({ setCurrentId })} />
                </Grid>
            </Grid>
        </Paper>
    )
}

const mapStateToProps = state => ({
    advisorsList: state.advisor.list
})

const mapActionToProps = {
    fetchAllAdvisors: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(AdvisorsList));
