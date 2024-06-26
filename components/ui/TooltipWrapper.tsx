import React, { useState } from "react";
import Transition from "./Transition";

interface TooltipWrapperProps {
  children?: JSX.Element | JSX.Element[];
  className?: string;
  bg?: string;
  size?: string;
  position?: string;
  text?: string;
}

function TooltipWrapper({ children, className, bg, size, position, text }: TooltipWrapperProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const positionOuterClasses = (position: string | undefined) => {
    switch (position) {
      case "top-right":
        return "left-full bottom-full";
      case "right":
        return "left-full top-1/2 -translate-y-1/2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2";
      default:
        return "bottom-full left-1/2 -translate-x-1/2";
    }
  };

  const sizeClasses = (size: string | undefined) => {
    switch (size) {
      case "lg":
        return "min-w-[18rem] p-3";
      case "md":
        return "min-w-[14rem] p-2";
      case "sm":
        return "min-w-[11rem] p-2";
      default:
        return "p-2";
    }
  };

  const positionInnerClasses = (position: string | undefined) => {
    switch (position) {
      case "right":
        return "ml-2";
      case "left":
        return "mr-2";
      case "bottom":
        return "mt-2";
      default:
        return "mb-2";
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
        onFocus={() => setTooltipOpen(true)}
        onBlur={() => setTooltipOpen(false)}
        className={className}
      >
        {children}
      </div>
      <div className={`z-30 absolute ${positionOuterClasses(position)}`} onClick={(e) => e.stopPropagation()}>
        <Transition
          show={tooltipOpen}
          appear={true}
          unmountOnExit={false}
          tag="div"
          className={`rounded-lg overflow-hidden ${
            bg === "dark" ? "bg-slate-800" : "bg-popover border border-border shadow-lg"
          } ${sizeClasses(size)} ${positionInnerClasses(position)}`}
          enter="transition ease-out duration-200 transform"
          enterStart="opacity-0 -translate-y-2"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveStart="opacity-100"
          leaveEnd="opacity-0"
        >
          {text ? text : children}
        </Transition>
      </div>
    </div>
  );
}

export default TooltipWrapper;
