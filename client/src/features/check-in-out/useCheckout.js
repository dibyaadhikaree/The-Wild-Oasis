import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useCheckOut() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const updatedDoc = {
    status: "checkedOut",
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, doc }) => updateBooking(id, { ...updatedDoc, ...doc }),
    onSuccess: () => {
      toast.success("Checked Out in guest");
      queryClient.invalidateQueries({ active: true });
      navigate("/bookings?status=checked-out");
    },
    onError: () => {
      toast.error("Failed");
    },
  });

  return { checkOut: mutate, isLoading };
}
