import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useForm } from "react-hook-form";
import { useUpdateSettings } from "./useUpdateSettings";
import Button from "../../ui/Button";

function UpdateSettingsForm() {
  const { data, isLoading, error } = useSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(error);

  const { updateSettings } = useUpdateSettings();

  const onSubmit = (data) => {
    console.log(data);
    updateSettings({
      ...data,
    });
  };

  if (isLoading) return <Spinner />;

  const { data: settings } = data;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings[0];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* 
            "minBookingLength": 3,
            "maxBookingLength": 90,
            "maxGuestsPerBooking": 9,
            "breakfastPrice": 15 */}

      <FormRow
        label="Minimum nights/booking"
        error={errors?.minBookingLength?.message}
      >
        <Input
          type="number"
          id="minBookingLength"
          {...register("minBookingLength", {
            required: "Min no of nights is required",
          })}
          defaultValue={minBookingLength}
        />
      </FormRow>
      <FormRow
        label="Maximum nights/booking"
        error={errors?.maxBookingLength?.message}
      >
        <Input
          type="number"
          id="maxBookingLength"
          {...register("maxBookingLength", {
            required: "Max no of nights is required",
          })}
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow
        label="Maximum guests/booking"
        error={errors?.maxGuestsPerBooking?.message}
      >
        <Input
          type="number"
          id="maxGuestsPerBooking"
          {...register("maxGuestsPerBooking", {
            required: "Max no of guests is required",
          })}
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow label="Breakfast price" maxGuestsPerBooking>
        <Input
          type="number"
          id="breakfastPrice"
          {...register("breakfastPrice", {
            required: "Breakfast Price is required",
          })}
          defaultValue={breakfastPrice}
          error={errors?.breakfastPrice?.message}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Update Settings</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
