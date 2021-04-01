import React from 'react'
import { ErrorMessage, Field, Form, Formik, useField } from 'formik';
import { array, boolean, mixed, number, object, string } from 'yup';
import { Box, Button, Card, CardContent, Checkbox, CheckboxProps, FormControlLabel, 
    FormGroup, MenuItem, TextField, Typography, Select, FormLabel, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete'
import {FormikAutocomplete, FormikTextField} from './FormikFields'
import styles from '../../styles/Forms.module.css'
import { BlueDenseButton } from '../items/buttons';

interface Props {
    books: string[];
    onSubmit: (vals, actions) => void;
}

const initialVals = {
    bookName: '',
    otherBookName: '',
    otherBookAuthor: '',
    weekDay: []
}

export default function BookClubSurvey({books, onSubmit}:Props) {

    const inputProps = {classes: {root: styles.input, error: styles['error-input']}}
    const inputLabelProps = {classes: {root: styles['text-field'], error: styles['error-label']}}
    const formHelperTextProps = {classes: {root: styles['helper-text'], error: styles['helper-text-error']}}

    return (
        <Box>
            <Formik validationSchema={object({
                bookName: string().required('Please select a book'),
                weekDay: array(string()).min(1, 'Please select at least one day')
            })} initialValues={initialVals} onSubmit={(vals, actions) => onSubmit(vals, actions)}>
                {({values, errors, touched, isSubmitting, isValidating}) => (
                    <Form>
                        <Box maxWidth={400}>
                            <FormGroup> 
                                <FormLabel error={Boolean(errors.bookName) && touched.bookName} htmlFor="bookName">
                                    What book do you want us to read?
                                </FormLabel>
                                <Field name="bookName" as={TextField} inputProps={{id: "bookName"}} select 
                                helperText={(errors.bookName && touched.bookName) ? errors.bookName : ''} 
                                error={Boolean(errors.bookName) && touched.bookName} >
                                    {[...books, 'No preference', 'Other',].map(book => (
                                        <MenuItem value={book} key={book}>{book}</MenuItem>
                                    ))}
                                </Field>
                            </FormGroup>
                        </Box>
                        {values.bookName === 'Other' && <Box mt={3} maxWidth={400}>
                            <Grid container spacing={3}>
                                <Grid item>
                                    <Box>
                                        <FormGroup>
                                            <FormLabel htmlFor="otherBookName">
                                                Book Title
                                            </FormLabel>
                                            <FormikTextField name="otherBookName" id="otherBookName" InputProps={inputProps}
                                            InputLabelProps={inputLabelProps} FormHelperTextProps={formHelperTextProps} />  
                                        </FormGroup>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box>
                                        <FormGroup>
                                            <FormLabel htmlFor="otherBookAuthor">
                                                Author
                                            </FormLabel>
                                            <FormikTextField name="otherBookAuthor" id="otherBookAuthor" InputProps={inputProps}
                                            InputLabelProps={inputLabelProps} FormHelperTextProps={formHelperTextProps} /> 
                                        </FormGroup>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>}
                        <Box maxWidth={400} my={6}>
                            <FormGroup>
                                <FormLabel error={Boolean(errors.weekDay) && (touched.weekDay as boolean)} htmlFor="weekDay">
                                    What day(s) do you want us to meet?
                                </FormLabel>
                                <Field name="weekDay" id="weekDay" as={FormikAutocomplete} multiple
                                options={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']} />
                            </FormGroup>
                        </Box>
                        <Box>
                            <BlueDenseButton type="submit" disabled={isSubmitting || isValidating} variant="contained">
                                Submit
                            </BlueDenseButton>
                        </Box>
                    </Form> 
                )}
            </Formik>
        </Box>
    )
}