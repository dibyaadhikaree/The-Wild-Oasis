import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";

import { useForm } from "react-hook-form";
import { useLogin } from "./useAuth";

function LoginForm() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const { login, isLoading } = useLogin();

  function onSubmit({ email, password }) {
    login(
      { email, password },
      {
        onSettled: () => {
          resetField("email");
          resetField("password");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          {...register("email", { required: true })}
          defaultValue={"dibyaaadhikari@gmail.com"}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", { required: true })}
          defaultValue={"1234"}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{isLoading ? <SpinnerMini /> : "Login"}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
