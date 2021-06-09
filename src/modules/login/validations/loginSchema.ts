import { User } from "@prisma/client";
import { object, string, SchemaOf, InferType } from "yup";

const loginSchema: SchemaOf<Pick<User, "email" | "password">> = object().shape({
  email: string().email("Invalid email.").required("Email is required."),
  password: string().required("Password is requried."),
});

export type TLoginSchemaValues = InferType<typeof loginSchema>;

export default loginSchema;
