import React from "react";

const Card = ({
  title,
  description,
  children,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  noPadding = false,
  border = true,
  hover = false,
  onClick,
}) => {
  return (
    <div
      className={`
        bg-white 
        shadow-lg 
        rounded-lg 
        ${border ? 'border border-gray-200' : ''} 
        ${hover ? 'transition-shadow duration-200 hover:shadow-xl' : ''}
        ${noPadding ? '' : 'p-6'} 
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {(title || description) && (
        <div className={`${headerClassName}`}>
          {title && (
            <h3 className={`text-xl font-semibold text-gray-800 mb-2 ${titleClassName}`}>
              {title}
            </h3>
          )}
          {description && (
            <p className={`text-gray-600 mb-4 ${descriptionClassName}`}>
              {description}
            </p>
          )}
        </div>
      )}
      <div className={bodyClassName}>
        {children}
      </div>
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

const CardContent = ({ children, className = "" }) => {
  return <div className={className}>{children}</div>;
};

const CardFooter = ({ children, className = "" }) => {
  return <div className={`mt-4 ${className}`}>{children}</div>;
};

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter
};

export default Card;