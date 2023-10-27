import Image from "next/image";
type CustomInputProps = {
  type?: string;

  isPassword: boolean;
  showPassword?: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  styles?: string;
  defaultValue?: string;
  showIcon?: boolean;
};

const CustomInput = ({
  type,
  styles,
  isPassword,
  showPassword,
  defaultValue,
  setShowPassword,
  setValue,
  showIcon,
}: CustomInputProps) => {
  return (
    <div
      className={`w-full flex justify-between px-3 my-4 border-[1px] relative    ${styles}`}
    >
      {showIcon && (
        <Image
          src={"/magnifying-glass.svg"}
          alt='Show'
          width={20}
          height={20}
          className=''
        />
      )}
      <input
        type={isPassword ? (showPassword ? "text" : "password") : "text"}
        name={type}
        defaultValue={defaultValue}
        onChange={(e) => setValue && setValue(e.target.value)}
        className={`text-sm  w-full focus:outline-none h-full 
border-0 px-3 py-1 bg-transparent`}
        placeholder={`${type ? `Enter your ${type}` : "Search..."} `}
      />{" "}
      {isPassword && (
        <Image
          src={`${showPassword ? "/eye2.svg" : "/eye.svg"}`}
          alt='Show'
          width={20}
          height={20}
          className=''
          onClick={() => setShowPassword && setShowPassword((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default CustomInput;
