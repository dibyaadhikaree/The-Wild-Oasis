/* eslint-disable react/prop-types */
import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckout";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import { useMoveBack } from "../../hooks/useMoveBack";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    _id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guest,
    cabin,
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    checkedIn: "green",
    checkedOut: "silver",
  };

  const navigate = useNavigate();

  const { checkOut, isLoading } = useCheckOut();

  const { delete: deleteBooking, isDeleting } = useDeleteBooking();

  const back = useMoveBack();

  return (
    <Table.Row>
      <Cabin>{cabin?.name}</Cabin>

      <Stacked>
        <span>{guest?.fullName}</span>
        <span>{guest?.email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{`${status}`}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See Details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check In
              </Menus.Button>
            )}
            {status === "checkedIn" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkOut({ id: bookingId })}
              >
                Check Out
              </Menus.Button>
            )}

            <Modal.Open opens="delete-bookings">
              <Menus.Button icon={<HiTrash />}>Delete Bookings</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete-bookings">
          {/* { resourceName, onConfirm, disabled, onClose } */}
          <ConfirmDelete
            resourceName={"Booking"}
            onConfirm={() => deleteBooking(bookingId)}
            disabled={isDeleting}
            onClose={back}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
