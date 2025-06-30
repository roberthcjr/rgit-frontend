"use client";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import UsersService from "./service";
import { UsersTable } from "./components/users-table";
import { InsertUserDialog } from "./components/insert-user-dialog/insert-user-dialog";
import { useForm } from "react-hook-form";
import { UserType, type ExtendedUserType } from "./types/user-type";
import { UserSchema } from "./schemas/user-input-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { showErrorToast, showSuccessToast } from "./components/toaster";
import { EditUserDialog } from "./components/edit-user-dialog/edit-user-dialog";
import { DeleteUserDialog } from "./components/delete-user-dialog";

export default function Page() {
  return <Users />;
}

function Users() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const userService = useMemo(() => new UsersService(), []);

  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getAll(),
  });

  const insertUserMutation = useMutation({
    mutationFn: (data: UserType) => userService.insertUser(data),
    onError: () => showErrorToast(),
    onSuccess: () => {
      showSuccessToast();
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
    },
  });

  const generatePassword = (length: number) => {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const integers = "0123456789";
    const especialCharacters = "!@#$%^&*_-=+";
    const possibilities = [letters, integers, especialCharacters];
    let password = "";
    for (let i = 0; i < length; i++) {
      const possibility =
        possibilities[Math.floor(Math.random() * possibilities.length)];
      password += possibility[Math.floor(Math.random() * possibility.length)];
    }
    return password;
  };

  const form = useForm<UserType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      surname: "",
      username: "",
      password: generatePassword(8),
      job: "",
      section: "",
    },
  });

  const insertUserFormSubmit = (values: UserType) => {
    insertUserMutation.mutate(values);
  };

  const [editOpen, setEditOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<ExtendedUserType | null>(null);

  const editForm = useForm<Omit<ExtendedUserType, "id">>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      surname: "",
      username: "",
      password: "",
      job: "",
      section: "",
    },
  });

  useEffect(() => {
    if (userToEdit) {
      editForm.reset({
        name: userToEdit.name,
        surname: userToEdit.surname,
        username: userToEdit.username,
        password: "",
        job: userToEdit.job,
        section: userToEdit.section,
      });
    }
  }, [userToEdit, editForm]);

  const editUserMutation = useMutation({
    mutationFn: (data: ExtendedUserType) => userService.updateUser(data),
    onSuccess: () => {
      showSuccessToast("Usuário editado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setEditOpen(false);
      setUserToEdit(null);
    },
    onError: () => {
      showErrorToast("Algo deu errado na edição");
    },
  });

  const handleEditUser = (user: ExtendedUserType) => {
    setUserToEdit(user);
    setEditOpen(true);
  };

  const submitEditUser = (values: Omit<ExtendedUserType, "id">) => {
    editUserMutation.mutate({
      id: userToEdit?.id ?? "",
      ...values,
    });
  };

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [userToDelete, setuserToDelete] = useState<ExtendedUserType | null>(
    null,
  );

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: () => {
      showSuccessToast("Usuário deletado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setDeleteOpen(false);
      setuserToDelete(null);
    },
    onError: () => {
      showErrorToast("Algo deu errado ao deletar usuário");
    },
  });

  const handleDeleteUser = (user: ExtendedUserType) => {
    setuserToDelete(user);
    setDeleteOpen(true);
  };

  const submitDeleteUser = () => {
    deleteUserMutation.mutate(userToDelete?.id ?? "");
  };

  return (
    <div className="container">
      <UsersTable
        data={query.data ?? []}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
      <div className="flex items-end">
        <InsertUserDialog
          form={form}
          open={open}
          setOpen={setOpen}
          onSubmit={insertUserFormSubmit}
        />
        <EditUserDialog
          form={editForm}
          open={editOpen}
          setOpen={setEditOpen}
          onSubmit={submitEditUser}
        />
        <DeleteUserDialog
          onSubmit={submitDeleteUser}
          open={deleteOpen}
          setOpen={setDeleteOpen}
        />
      </div>
    </div>
  );
}
