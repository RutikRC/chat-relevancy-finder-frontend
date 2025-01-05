import React from 'react'

const FormHeader = ({ title }) => {
  return (
    <div className="sm:w-full sm:max-w-sm">
      <h2 className="text-['18px'] font-bold leading-9 tracking-tight text-gray-900">
        {title}
      </h2>
    </div>
  )
}

export default FormHeader;
