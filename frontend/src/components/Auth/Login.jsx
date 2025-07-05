import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/validation/loginSchema";
import { FiAtSign } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import AuthFormWrapper from "./AuthFormWrapper";
import FormInput from "./FormInput";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log("Login data: ", data);
  };

  return (
    <AuthFormWrapper
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      {/* Username */}
      <FormInput
        label="Username"
        name="username"
        type="text"
        formType="login"
        placeholder="Enter your username"
        register={register}
        error={errors.username}
        inputIcon={FiAtSign}
      />

      {/* Password */}
      <FormInput
        label="Password"
        name="password"
        type="password"
        formType="login"
        placeholder="Enter your password"
        register={register}
        error={errors.password}
        inputIcon={FaLock}
      />
    </AuthFormWrapper>
  );
}
