import React from 'react'
import NumberFormat from 'react-number-format'

function USNumberFormat(props) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
      prefix="$"
      decimalScale={2}
    />
  )
}

export default USNumberFormat
