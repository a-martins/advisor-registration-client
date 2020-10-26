import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Grid, TextField, withStyles } from '@material-ui/core'

import * as actions from '../actions/advisor'
import useForm from '../hooks/useForm'

import { useToasts } from 'react-toast-notifications'

const style = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 230,
        },
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    fullName: "",
    email: "",
    mobile: "",
    registryNumber: ""
}

const AdvisorForm = ({ classes, ...props }) => {
    const { currentId, setCurrentId } = props
    const { addToast } = useToasts()

    const validate = (fieldValues = values) => {
        let errorObject = { ...errors }

        if ('fullName' in fieldValues)
            errorObject.fullName = fieldValues.fullName ? "" : "This field is required."

        if ('mobile' in fieldValues)
            errorObject.mobile = fieldValues.mobile ? "" : "This field is required."

        if ('registryNumber' in fieldValues)
            errorObject.registryNumber = fieldValues.registryNumber ? "" : "This field is required."

        if ('email' in fieldValues)
            errorObject.email = (/.+@.+..+/).test(fieldValues.email) ? "" : "Email is empty or not valid."

        setErrors({
            ...errorObject
        })

        if (fieldValues === values)
            return Object.values(errorObject).every(x => x === "")
    }

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(initialFieldValues, validate, setCurrentId)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (currentId === 0)
                props.createAdvisor(values, onSuccess)
            else
                props.updateAdvisor(currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (currentId !== 0) {
            setValues({
                ...props.advisorsList.find(x => x.id === currentId)
            })
            setErrors({})
        }
        //eslint-disable-next-line
    }, [currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        {...(errors.fullName && { error: true, helperText: errors.fullName })}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && { error: true, helperText: errors.email })}
                    />

                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        {...(errors.mobile && { error: true, helperText: errors.mobile })}
                    />
                    <TextField
                        name="registryNumber"
                        variant="outlined"
                        label="Registry Number"
                        value={values.registryNumber}
                        onChange={handleInputChange}
                        {...(errors.registryNumber && { error: true, helperText: errors.registryNumber })}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={() => resetForm()}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    )
}

const mapStateToProps = state => ({
    advisorsList: state.advisor.list
})

const mapActionToProps = {
    createAdvisor: actions.create,
    updateAdvisor: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(style)(AdvisorForm))
