import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin sucessfully deleted");
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isDeleting };
}
