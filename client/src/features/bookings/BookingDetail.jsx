import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";

import Spinner from "../../ui/Spinner";
import { useBooking } from "./useBooking";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckout";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Small = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

function BookingDetail() {
  const moveBack = useMoveBack();

  const navigate = useNavigate();

  const { data, isLoading } = useBooking();

  const { delete: deleteBooking, isDeleting } = useDeleteBooking();

  const { checkOut } = useCheckOut();

  if (isLoading) return <Spinner />;

  const { data: booking = {} } = data;

  const status = booking.status;

  const statusToTagName = {
    unconfirmed: "blue",
    checkedIn: "green",
    checkedOut: "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading
            as="h1"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Booking <Small>#{booking._id}</Small>
          </Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${booking._id}`)}
            >
              Check In
            </Button>
          )}

          {status === "checkedIn" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkOut({ id: booking._id })}
            >
              Check Out
            </Button>
          )}

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>

          <Modal.Open opens="delete-bookings">
            <Button variation="danger">Delete Bookings</Button>
          </Modal.Open>
        </ButtonGroup>

        <Modal.Window name="delete-bookings">
          <ConfirmDelete
            resourceName="Booking"
            onConfirm={() =>
              deleteBooking(booking._id, {
                onSuccess: () => navigate("/"),
              })
            }
            disabled={isDeleting}
            onClose={moveBack}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
