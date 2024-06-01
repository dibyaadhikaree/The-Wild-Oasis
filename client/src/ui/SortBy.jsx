import { useSearchParams } from "react-router-dom";
import Select from "./Select";

/* eslint-disable react/prop-types */
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get("sort-by") || "name-asc";

  function handleChange(e) {
    searchParams.set("sort-by", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={value}
    />
  );
}

export default SortBy;
