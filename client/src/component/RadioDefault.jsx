import React from "react";

const RadioDefault = ({ label, validate, register, error, option = [] }) => {
  return (
    <div className="mb-4">
      <fieldset className="m-2">
        <legend className="text-sm font-medium text-gray-700">{label}:</legend>
        {option.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="radio"
              id={item.label}
              value={item.value}
              className="mr-2 text-blue-600 border-gray-300 focus:ring-blue-500"
              {...register(label, validate)}
            />
            <label htmlFor={item.label} className="text-sm text-gray-700">
              {item.label}
            </label>
          </div>
        ))}
      </fieldset>
      {error && error[label] && (
        <span className="text-sm text-red-500">{error[label]?.message}</span>
      )}
    </div>
  );
};

export default RadioDefault;
