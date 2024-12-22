import { z } from "zod";

const createNameValidation = z.object(
  {
    firstName: z
      .string({ required_error: "First Name is required" })
      .nonempty({ message: "First Name cannot be empty" }),
    lastName: z.string({ required_error: "Last Name is required" }).nonempty({
      message: "Last Name cannot be empty",
    }),
  },
  {
    required_error: "Name is required",
  },
);

const createUserValidation = z.object({
  body: z.object({
    name: createNameValidation,
    email: z.string({ required_error: "Email is required" }).email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  }),
});

const updateUserValidation = z.object({
  body: z.object({
    name: createNameValidation.optional(),
    profilePic: z.string().optional(),
  }),
});

const userValidations = {
  createUserValidation,
  updateUserValidation,
};

export default userValidations;
