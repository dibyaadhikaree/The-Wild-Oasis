import styled from "styled-components";
import Spinner from "../../ui/Spinner";

import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get("discount") || "all";

  // Filter

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins.data;
  if (filterValue === "no-discount")
    filteredCabins = cabins.data.filter((cabin) => cabin.discount === 0);
  if (filterValue === "discount")
    filteredCabins = cabins.data.filter((cabin) => cabin.discount > 0);

  // Sort
  const sortBy = searchParams.get("sort-by") || "name-asc";

  const [field, direction] = sortBy.split("-");

  const sortedCabins = filteredCabins.sort((a, b) => {
    if (direction === "asc") return a[field] - b[field];
    if (direction === "desc") return -a[field] + b[field];
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin._id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
