import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  login,
  getCurrentUser,
  logout,
  signup,
  updateUserData,
  updatePassword,
} from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.token);
      queryClient.removeQueries();
      toast.success("Sucessfully Logged In");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Invalid username or password");
    },
    retry: false,
  });

  return { login: mutate, isLoading };
}

export function useUser() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
    // enabled: !localStorage.getItem("jwt") === "loggedouttoken",
    onError: () => {
      navigate("/login");
    },
    retry: false,
  });

  return { currentUser: data, isLoading };
}

export function useLogout() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      toast.success("Successfully Logged Out");
      queryClient.removeQueries();
      localStorage.removeItem("jwt");
      navigate("/login", {
        replace: true,
      });
    },
    onError: () => {
      toast.error("Error logging out");
    },
  });

  return { logout: mutate, isLoading };
}
export function useSignup() {
  // const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => {
      signup(data);
    },
    onSuccess: () => {
      toast.success("Successfully Signed Up");
      //  localStorage.setItem("jwt", data.token);
    },
    onError: () => {
      toast.error("Error signing in");
    },
  });

  return { signup: mutate, isSigningUp: isLoading };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => updateUserData(data),
    onSuccess: (user) => {
      toast.success("Succesfully Updated User data");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => toast.error("Couldnt update user data"),
  });

  return { updateUserData: mutate, isUpdating: isLoading };
}

export function useUpdatePassword() {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ oldPass, newPass, confirmPass }) =>
      updatePassword({ oldPass, newPass, confirmPass }),
    onSuccess: () => toast.success("Succesfully Updated User Password"),
    onError: () => toast.error("Error"),
  });

  return { updatePassword: mutate, isUpdating: isLoading };
}
