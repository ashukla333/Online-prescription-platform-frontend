import React from "react";
import { Controller } from "react-hook-form";

export const InputHook = ({
  name,
  subName,
  control,
  rules,
  errors,
  type = "text",
  placeholder,
  parentClassName,
  subNameClassName,
  className,
  disabled
}) => {
  return (
    <div className={`flex flex-col gap-1 ${parentClassName}`}>
      <span className={`!capitalize text-sm text-blackish-grey-color font-medium ${subNameClassName}`}>
        {subName}
      </span>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <>
              <input
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                placeholder={placeholder}
                type={type}
                name={name}
                control={control}
                rules={rules}
                className={`w-full border border-zinc-400 rounded-lg p-2 outline-none text-sm ${className} ${disabled ? "bg-gray-100" : ""}`}
              />
              <span className="!text-red-500 text-sm">
                {errors[name]?.message ? errors[name]?.message : ""}
              </span>
            </>
          );
        }}
      ></Controller>
    </div>
  );
};