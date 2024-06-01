/* eslint-disable react/prop-types */
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import { useCreateEditCabin } from "./useCreateEditCabin";

function CreateCabinForm({ cabinToUpdate = {}, onClose }) {
  const { _id: editId, ...editValues } = cabinToUpdate;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { mutate, isCreating } = useCreateEditCabin();

  const onSubmit = (data) => {
    mutate(
      {
        ...data,
        id: isEditSession ? editId : null,
        image: editValues.image,
      },
      {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      }
    );
  };

  const onError = (err) => {
    console.error(err);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow error={errors?.name?.message} label="Cabin Name">
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Max Capacity">
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label="Regular Price">
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label="Discount">
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (val) =>
              val < getValues().regularPrice ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow error={errors?.description?.message} label="Description">
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Upload Photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            // required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button type="submit"> {!isEditSession ? "Add" : "Edit"} cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
