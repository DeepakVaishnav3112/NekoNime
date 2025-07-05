import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../utils/validation/signupSchema";
import { FiAtSign } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import FormInput from "./FormInput";
import AuthFormWrapper from "./AuthFormWrapper";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    console.log("Sign Up data: ", data);
  };

  const password = watch("password");

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
        formType="signup"
        placeholder="Enter your username"
        register={register}
        error={errors.username}
        inputIcon={FiAtSign}
      />

      {/* Email */}
      <FormInput
        label="Email"
        name="email"
        type="email"
        formType="signup"
        placeholder="Enter your email"
        register={register}
        error={errors.email}
        inputIcon={MdEmail}
      />

      {/* Password */}
      <FormInput
        label="Password"
        name="password"
        type="password"
        formType="signup"
        placeholder="Enter your password"
        register={register}
        error={errors.password}
        inputIcon={FaLock}
      />

      {/* Confirm Password */}
      <FormInput
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        formType="signup"
        placeholder="Re-enter your password"
        register={register}
        error={errors.confirmPassword}
        required={{ value: true, message: "Please confirm your password" }}
        inputIcon={FaLock}
      />
    </AuthFormWrapper>
  );
}
