import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryClient = useQueryClient();

  //Filtering
  const [first, second] = (searchParams.get("status") || "all").split("-");

  let statusStr;
  if (!second) statusStr = first === "all" ? "" : `status=${first}`;
  else
    statusStr = "status=" + first + second[0]?.toUpperCase() + second?.slice(1);

  //Sorting
  const sortStr = `${searchParams.get("sort-by") || "startDate-asc"}`;

  //Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const queryUrl = `?${statusStr}&sortBy=${sortStr}&page=${page}`;

  const { data = {}, isLoading } = useQuery({
    queryKey: ["bookings", queryUrl],
    queryFn: () => getBookings(queryUrl),
  });

  const pageCount = Math.ceil(data.count / 3);
  // Pre fetching
  const preFetchUrl = `?${statusStr}&sortBy=${sortStr}&page=${page + 1}`;
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", preFetchUrl],
      queryFn: () => getBookings(preFetchUrl),
    });

  return { data, isLoading };
}
