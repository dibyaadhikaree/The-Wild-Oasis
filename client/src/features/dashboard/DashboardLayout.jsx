import styled from "styled-components";
// import { useRecentStays } from "./useRecentStays";
// import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
// import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

import { useBookings } from "../bookings/useBookings";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {
    data: { data: bookings },
    isLoading: isLoading1,
  } = useBookings();
  // const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        // confirmedStays={confirmedStays}
        numDays={10}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      {/* <DurationChart confirmedStays={confirmedStays} /> */}
      <SalesChart bookings={bookings} numDays={10} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
