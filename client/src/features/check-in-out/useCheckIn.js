import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const updatedDoc = {
    isPaid: true,
    status: "checkedIn",
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, doc }) => updateBooking(id, { ...updatedDoc, ...doc }),
    onSuccess: () => {
      toast.success("Checked in guest");
      queryClient.invalidateQueries({ active: true });
      navigate("/bookings?status=checked-in");
    },
    onError: () => {
      toast.error("Failed");
    },
  });

  return { checkIn: mutate, isLoading };
}
