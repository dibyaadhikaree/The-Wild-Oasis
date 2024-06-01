import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("Deleted Booking Successfully");
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Failed");
    },
  });

  return { delete: mutate, isDeleting: isLoading };
}
