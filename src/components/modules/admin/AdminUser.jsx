import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { InputHook } from "@/components/common/InputField";
import MainLogo from "@/components/common/MainLogo";
import { TextContent } from "@/components/common/Text";
import { setCookie } from "cookies-next";
import { customAxiosPOST } from "@/app/api/methods";
import { adminLoginApi } from "@/app/api/list";

const dummyData = {
  username: "testuser",
  password: "Test@123",
};

const AdminUser = ({ setAuthType }) => {
  const FormFields = [
    {
      name: "email",
      subName: "Email",
      type: "text",
      validations: {
        required: "Email is required",
      },
      placeholder: "Enter Email",
    },
    {
      name: "password",
      subName: "Password",
      type: "password",
      validations: {
        required: "Password is required",
      },
      placeholder: "Enter Password",
    },
  ];

  const {
    handleSubmit,
    control,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data) => {

    try {
      const result = await customAxiosPOST("", adminLoginApi, data);

      if (result?.status) {
        setCookie("AuthToken", result?.data?.token, {
          maxAge: 24 * 60 * 60,
        });
        localStorage.setItem("AuthToken", result?.data?.token);
        clearErrors();
        enqueueSnackbar("Login successful!", {
          variant: "success",
        });
        reset();
        router.push("/");
      } else {
        enqueueSnackbar("Invalid username or password", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong", {
        variant: "warning",
      });
    }
  };

  return (
    <div className="flex w-[95%] rounded-md sm:w-[400px] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] gap-4 flex-col justify-center items-center p-8">
      <MainLogo />
      <TextContent
        text={"Welcome Back ! 👋"}
        className={"text-primary-text-color"}
      />
      <TextContent
        text={"Login with Username and Password"}
        className={"text-primary-black-color font-sans w-max text-xl"}
      />

      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {FormFields?.map((field, index) => (
          <InputHook
            key={index}
            name={field?.name}
            subName={field?.subName}
            type={field?.type}
            subNameClassName={"text-[16px]"}
            className={
              "p-3 rounded-[5px] focus:outline-none border-[1px] border-grey-color focus:border-red-400 transition-all text-primary-text-color"
            }
            parentClassName={"gap-2"}
            control={control}
            errors={errors}
            rules={{ ...field?.validations }}
            placeholder={field?.placeholder}
          />
        ))}
        <Button
          type="submit"
          className="bg-primary-black-color w-full py-3 text-sm font-roboto leading-4 tracking-wider"
        >
          LOGIN
        </Button>
        <TextContent
          text={"Forgot Password?"}
          onClick={() => setAuthType("forgot password")}
          className={
            "self-end cursor-pointer hover:text-primary-text-color text-sm hover:underline transition-all"
          }
        />
      </form>
    </div>
  );
};

export default AdminUser;
