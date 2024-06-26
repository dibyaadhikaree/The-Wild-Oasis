import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import Spinner from "../../ui/Spinner";
import { useBookings } from "./useBookings";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { data, isLoading } = useBookings();

  if (isLoading) return <Spinner />;

  console.log(isLoading, "is Loading");

  console.log(data, "in booking table");

  const bookings = data.data;
  const totalDocs = data.count;

  console.log(bookings, "bookings  totalct : ", totalDocs !== 0);

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        {totalDocs !== 0 ? (
          <Table.Body
            data={bookings}
            render={(booking) => (
              <BookingRow key={booking._id} booking={booking} />
            )}
          />
        ) : (
          <Table.Body>No bookings found</Table.Body>
        )}

        <Table.Footer>
          <Pagination count={totalDocs} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
