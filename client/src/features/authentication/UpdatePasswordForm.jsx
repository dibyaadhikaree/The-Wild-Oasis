import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdatePassword } from "./useAuth";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();

  const { errors } = formState;

  const { updatePassword, isUpdating } = useUpdatePassword();

  function onSubmit({ oldPass, newPass, confirmPass }) {
    updatePassword(
      { oldPass, newPass, confirmPass },
      { onSuccess: () => reset }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Previous Password " error={errors?.oldPass?.message}>
        <Input
          type="password"
          id="oldPass"
          autoComplete="current-password"
          defaultValue="234"
          disabled={isUpdating}
          {...register("oldPass", {
            required: "This field is required",
            minLength: {
              value: 2,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.newPass?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          defaultValue="1234"
          disabled={isUpdating}
          {...register("newPass", {
            required: "This field is required",
            minLength: {
              value: 4,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Confirm password" error={errors?.confirmPass?.message}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          defaultValue="1234"
          disabled={isUpdating}
          {...register("confirmPass", {
            required: "This field is required",
            validate: (value) =>
              getValues().newPass === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
