import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useAuth";
import Spinner from "../../ui/Spinner";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, formState, getValues } = useForm();

  const { errors } = formState;

  const { signup, isSigningUp } = useSignup();

  const onSubmit = (data) => {
    signup(data);
  };

  if (isSigningUp) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.username?.message}>
        <Input
          type="text"
          id="username"
          {...register("username", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is requried",
            minLength: {
              value: 3,
              message: "Min pass length is 3",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.confirmPassword?.message}>
        <Input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: true,
            validate: (val) =>
              val === getValues().password || "Passwords needs to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
