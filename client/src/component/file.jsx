// component/InputFileDefault.jsx
import React from 'react';

const InputFileDefault = ({ label, placeholder, type, validate, register, error, multiple }) => {
  return (
    <div className="mb-4">
      <label htmlFor={label} className="block mb-1 text-sm font-medium text-gray-700">
        {label}:
      </label>
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        multiple={multiple}
        className={`block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${error && error[label] ? 'border-red-500' : 'border-gray-300'}`}
        {...register(label, validate)}
      />
      {error && error[label] && (
        <span className="text-sm text-red-500">{error[label]?.message}</span>
      )}
    </div>
  );
};

export default InputFileDefault;
