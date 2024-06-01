import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      console.log("sucess in creating");
      toast.success("Settings Updated Successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: () => {
      toast.error("Settings failed to update");
    },
  });

  return { updateSettings: mutate, isLoading };
}
