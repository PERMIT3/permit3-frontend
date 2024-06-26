import React, { useState } from "react";
import { guidGenerator } from "../../../utils/misc";
import Tooltip from "../Tooltip";

interface InputProps {
  label?: string;
  tooltip?: string;
  prefix?: string;
  prefixIcon?: JSX.Element;
  suffixIcon?: JSX.Element;
  prefixButtonContent?: JSX.Element | string;
  suffixButtonContent?: JSX.Element | string;
  prefixButtonOnClick?: (e: React.MouseEvent) => void;
  suffixButtonOnClick?: (e: React.MouseEvent) => void;
  placeholder?: string;
  supportingText?: string;
  id?: string;
  border?: boolean;
  className?: string;
  type?: string;
  required?: boolean;
  size?: string;
  disabled?: boolean;
  errorText?: string;
  displayInputAsText?: boolean;
  successText?: string;
  inputProps?: { [key: string]: any };
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input(props: InputProps) {
  const {
    id = "",
    className = "",
    type = "text",
    required = false,
    inputProps = {},
    label,
    tooltip,
    prefix,
    prefixIcon,
    prefixButtonContent,
    suffixButtonContent,
    suffixIcon,
    prefixButtonOnClick,
    suffixButtonOnClick,
    placeholder,
    size,
    disabled = false,
    errorText,
    successText,
    displayInputAsText = false,
    supportingText,
    border = true,
    value,
    name,
    onChange
  } = props;

  const [focused, handleFocused] = useState(false);

  let inputId = id;

  const getPaddingClassNames = () => {
    switch (size) {
      case "custom":
        return "";
      case "sm":
        return "px-2 py-1";
      case "md":
        return "py-2 px-3";
      case "lg":
        return "px-4 py-3";
      default:
        return "py-2 px-3";
    }
  };

  const classes = `border border-[#D0D5DD]/10 focus:border-[#D0D5DD]/50 w-full text-base bg-gray-520 text-white rounded-md leading-5 placeholder:text-white/20 focus:ring-0 focus:outline-none disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed`;

  if (inputId === "") {
    inputId = guidGenerator();
  }

  return (
    <div
      className={`w-full rounded-md${border ? " border-2 disabled:border-slate-200" : ""} ${
        errorText
          ? "border-rose-300"
          : successText
          ? "border-emerald-300"
          : `${focused ? "border-transparent hover:border-transparent" : "border-transparent hover:border-transparent"}`
      }`}
    >
      <div className="flex items-center justify-between">
        {label ? (
          <label className="block text-sm mb-1" htmlFor={inputId}>
            {label}
            {required ? <span className="text-rose-500"> *</span> : ""}
          </label>
        ) : null}
        {tooltip ? (
          <Tooltip className="ml-2" bg="dark" size="md">
            <div className="text-sm text-slate-200">{tooltip}</div>
          </Tooltip>
        ) : null}
      </div>
      <div className="flex w-full" onClick={() => document.getElementById(inputId)?.focus()}>
        {prefix || prefixIcon ? (
          <div id={`${inputId}-prefix`} className="flex items-center pointer-events-none">
            {prefix ? <span className="text-sm text-slate-400 font-medium px-3">{prefix}</span> : null}
            {prefixIcon ? prefixIcon : null}
          </div>
        ) : null}
        {prefixButtonContent ? (
          <button
            className="group"
            aria-label="Input Button"
            type="button"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              prefixButtonOnClick && prefixButtonOnClick(e);
            }}
          >
            {prefixButtonContent}
          </button>
        ) : null}

        {displayInputAsText ? (
          <p>{value}</p>
        ) : (
          <input
            id={inputId}
            className={`${classes} ${getPaddingClassNames()} ${className}`}
            type={type}
            required={required}
            placeholder={placeholder ? placeholder : ""}
            disabled={disabled}
            {...inputProps}
            value={value}
            onChange={onChange}
            name={name}
            onFocus={() => {
              handleFocused(true);
            }}
            onBlur={() => {
              handleFocused(false);
            }}
          />
        )}

        {suffixIcon ? (
          <div className="flex items-center pointer-events-none pr-2">{suffixIcon ? suffixIcon : null}</div>
        ) : null}
        {suffixButtonContent ? (
          <button
            className="flex-shrink-0 group pr-2"
            aria-label="Input Button"
            type="button"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              suffixButtonOnClick && suffixButtonOnClick(e);
            }}
          >
            {suffixButtonContent}
          </button>
        ) : null}
      </div>
      {supportingText ? <div className="text-xs mt-1">{supportingText}</div> : null}
      {errorText ? <div className="text-xs mt-1 text-rose-500">{errorText}</div> : null}
      {successText ? <div className="text-xs mt-1 text-emerald-500">{successText}</div> : null}
    </div>
  );
}

export default Input;
