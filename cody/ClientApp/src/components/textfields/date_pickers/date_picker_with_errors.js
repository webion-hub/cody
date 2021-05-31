import React from 'react';
import { PickerWithErrorAndLabel } from '../picker_with_error_and_label';
import { DatePicker } from './date_picker';

export function DatePickerWithErrors(props){
  const {
    minBirthDateError,
    maxBirthDateError,
    generalError,
    ...datePickerProps
  } = props

  const areErrors = 
    minBirthDateError || 
    maxBirthDateError || 
    generalError

const getError = () => {
  if(generalError)
    return "Data invalida"
  if(minBirthDateError)
    return "Data inferiore al minimo valore"
  if(maxBirthDateError)
    return "Data superiore al massimo valore"
  
  return null
}

  return (
    <PickerWithErrorAndLabel
      fadeError={areErrors}
      errorMessage={getError()}
    >
      <DatePicker
        {...datePickerProps}
      />
    </PickerWithErrorAndLabel>
  )
}