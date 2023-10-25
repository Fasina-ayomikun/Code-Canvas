import React from "react";

const Toggle = ({
  isDropDownOpen,
  dropDownContent,
}: {
  isDropDownOpen: boolean;
  dropDownContent: {
    title: string;
    handleClick: () => void;
  }[];
}) => {
  return (
    <div
      className={`drop-down absolute right-0 z-10 mt-2 w-56  rounded-md box_shadow2  bg-white top-11  ${
        isDropDownOpen ? "block" : "hidden"
      }`}
    >
      {/* TODO:Create a new component for this */}
      <div className='drop-down py-2 p-2 rounded-md  bg-white'>
        {dropDownContent.map(({ title, handleClick }, index) => (
          <p
            key={index}
            onClick={handleClick}
            className='drop-down px-3 z py-2 text-sm border-b-[1px] text-dark-gray hover:bg:gray-300  cursor-pointer '
          >
            {title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Toggle;
