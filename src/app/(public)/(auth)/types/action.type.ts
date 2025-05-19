export type State = {
  errors: {
    username?: string[] | undefined;
    password?: string[] | undefined;
  } | null;
};

export const initialState: State = {
  errors: null,
};

export type Action = (prevState: State, formData: FormData) => Promise<State>;
