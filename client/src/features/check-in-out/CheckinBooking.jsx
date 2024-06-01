import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { useCheckIn } from "./useCheckIn";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);

  const [addBreakfast, setAddBreakfast] = useState(false);

  const moveBack = useMoveBack();

  const { data, isLoading } = useBooking();

  const { checkIn, isLoading: isCheckingIn } = useCheckIn();

  const { data: settings, isLoading: settingsLoading } = useSettings();
  // : { data: settings } = {}

  useEffect(() => {
    setConfirmPaid(data?.data?.isPaid);
  }, [data]);

  if (isLoading || settingsLoading) return <Spinner />;

  const {
    _id: bookingId,
    guest,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = data.data;

  function handleCheckin() {
    // set the status to checked in

    if (addBreakfast) {
      checkIn({
        id: bookingId,
        doc: {
          isPaid: true,
          hasBreakfast: true,
          totalPrice: settings.data[0].breakfastPrice * 1 + totalPrice,
          extrasPrice: settings.data[0].breakfastPrice * 1,
        },
      });
    } else checkIn({ id: bookingId });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={data.data} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((breakfast) => !breakfast);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Add Breakfast for ${settings.data[0].breakfastPrice}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id={bookingId}
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guest.fullName} has paid the total amount of{" "}
          {totalPrice +
            (addBreakfast ? settings.data[0].breakfastPrice * 1 : 0)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
