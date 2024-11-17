import React from "react";

const InputDefault = ({
  label,
  placeholder,
  type,
  validate,
  register,
  error,
  defaultInput,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block mb-1 text-sm font-medium text-gray-700"
      >
        {label}:
      </label>
      <input
        defaultValue={defaultInput}
        type={type}
        id={label}
        placeholder={placeholder}
        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          error && error[label] ? "border-red-500" : "border-gray-300"
        }`}
        {...register(label, validate)}
      />
      {error && error[label] && (
        <span className="text-sm text-red-500">{error[label]?.message}</span>
      )}
    </div>
  );
};

export default InputDefault;
