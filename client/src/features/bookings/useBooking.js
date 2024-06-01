import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { id: bookingId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  return { data, isLoading };
}
