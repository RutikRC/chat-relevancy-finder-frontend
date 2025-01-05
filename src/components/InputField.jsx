import { ErrorMessage, Field } from 'formik'
import React from 'react'
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex: 1; /* Allow InputWrapper to grow */
  align-items: center;
  /* gap: 10px; */
`;

const Label = styled.label`
  font-size: 16px;
  min-width: ${({ minLabelWidth }) => minLabelWidth || '25%'};
`;

const StyledField = styled(Field)`
  flex: 1; /* Allow input field to grow */
  width: 100%; 
  padding: 4px 0px 4px 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  &:focus{
    border: none;
  }
`;

const InputField = ({ label, name, type, required, width, height, minLabelWidth }) => {
  return (
    <div className="flex items-center w-full">
      <Label
        htmlFor={name}
        minLabelWidth={minLabelWidth}
      >
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </Label>
      <InputWrapper>
        <StyledField
          id={name}
          name={name}
          type={type? type : "text"}
          autoComplete={name}
          required={required? required : false}
          className="block rounded-sm border-0 py-1 pl-1 shadow-sm ring-1 focus:ring-inset focus:ring-indigo-400 text-[11px]"
        />
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-600 text-sm mt-1"
        />
      </InputWrapper>
    </div>
  )
}

export default InputField;