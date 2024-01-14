import React from "react";
import PropTypes from "prop-types";
import CalendarPicker from "components/Calendar/Calendar";
import './Input.css';
import {Select } from 'flowbite-react';

function Input({type, label, name, value, onChange, placeholder, error, icon, customClass, addedClass, ref, options, onClick, endIcon, readOnly, autoFocus}) {
    let inputClass =
            "text-sm placeholder-gray-500 pr-4 rounded-lg border border-gray-300 w-full md:py-2 py-3 focus:outline-none focus:border-primaryButton  mt-1" +
            (error ? " border-red-500" : " border-gray-300") + (icon ? " pl-10" : " ");
    if (customClass) inputClass=customClass;
    if (addedClass) inputClass +=` ${addedClass}`; // dont remove whitespace char

    const getInput = () => {
    switch (type) {
      case "text":
        return (
          <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            className={inputClass}
          />
        );
        case "password":
        return (
          <input
            type="password"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClass}
          />
        );
        case "number":
        return (
          <input
            type="number"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClass}
            autoFocus={autoFocus}
          />
        );
        case "toggle":
          return (
            <label htmlFor={name} className="toggle-container">
              <input
                type="checkbox"
                id={name}
                name={name}
                checked={value}
                onChange={onChange}
                className="toggle-checkbox"
              />
              <span className="toggle-slider"></span>
            </label>
          );
      case "file":
        return (
          <input
              ref = {ref}
            type="file"
            id={name}
            name={name}
            onChange={onChange}
            className="input-file bg-emerald-600 border-emerald-600 text-gray-100 px-3.5 py-2.5 rounded-lg shadow-lg text-sm text-center gap-2 items-center hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          />
        );
      case "select":
        return (
        //   <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
        //   <option>New Mexico</option>
        //   <option>Missouri</option>
        //   <option>Texas</option>
        // </select>
          <Select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            sizing={'md'}
            className="mt-1"
          >
            {value === "" && (
              <option value="">
                choose
              </option>
            )}
            {options && options.map((option) => (
              <option key={option.key ?? option.value} value={option.value ?? option.key}>
                {option.label}
              </option>
            ))}
            
          </Select>
        );
        case "textarea":
          return(
            <textarea
              rows={4}
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={inputClass}
            />
          );
        case "date": 
          return (
            <CalendarPicker
              name={name}
              value={value}
              error={error} 
              onChange={onChange}
            />
          );
      default:
        return null;
    }
  };

    return (
        <div className="flex flex-col mb-3">
            {label && <label htmlFor={name} className="text-sm text-gray-600">{label}</label>}
            <div className="relative">
                {icon && <div
                    className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 ">
                    {icon}
                </div>}
                {getInput()}
                {endIcon && <div onClick={onClick}
                    className="inline-flex items-center justify-center absolute right-0 top-0 h-full w-10 text-gray-400 rounded-full hover:bg-slate-100 hover:bg-opacity-50 hover:cursor-pointer">
                    {endIcon}
                </div>}
                
            </div>
            {error && <div className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{error}</div>}
        </div>
    );
}


Input.propTypes = {
  type: PropTypes.oneOf(["text", "toggle", "file", "select", "date", "textarea", "password"]).isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.oneOfType([Boolean, String]),
  icon: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default Input;
