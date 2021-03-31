import React, {useState} from 'react'
import {useField, Field} from 'formik'
import {TextField, InputAdornment, IconButton} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';

import VisibilityIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffOutlined';

export const FormikTextField = (props) => {
    const [field, meta] = useField({
        name: props.name,
        type: props.type || 'text',
    })
    return (
        <Field {...props} {...field} as={TextField} error={meta.touched && meta.error ? true : false} 
        helperText={meta.touched && meta.error ? meta.error : ''} />
    )
}

export const FormikPasswordField = (props) => {

    const [visible, setVisible] = useState(false)

    const [field, meta] = useField({
        name: props.name,
    })

    return (
        <Field {...props} {...field} as={TextField} error={meta.touched && meta.error ? true : false} 
        helperText={meta.touched && meta.error ? meta.error : ''} type={visible ? 'text' : 'password'}
        InputProps={{endAdornment: <InputAdornment position="end">
            <IconButton aria-label="Toggle password visiblity" onClick={() => setVisible(!visible)}>
                {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
        </InputAdornment>}} />
    )
}

export const FormikAutocomplete = ({ textFieldProps, ...props }) => {

    const [field, meta, helpers] = useField({
        name: props.name
    })

    return (
      <Autocomplete options={props.options}
        {...props}
        {...field}
        onChange={ (_, value) => helpers.setValue(value) }
        onBlur={ () => helpers.setTouched(true)}
        renderInput={ props => (
          <TextField {...props} {...textFieldProps} helperText={meta.touched && meta.error ? meta.error : ''}
           error={meta.touched && meta.error ? true : false} />
        )}
      />
    );
  }