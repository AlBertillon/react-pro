import { UserRegistrationForm, type RegistrationValues } from "features/userRegistration";

export const RegisterPage = () => {
  const handleSubmit = (values: RegistrationValues) => {
    console.log("Registration values:", values);
    localStorage.setItem("isAuthenticated", "true");
    window.location.href = "/";
  };

  return (
    <div>
      <UserRegistrationForm onSubmit={handleSubmit} />
    </div>
  );
};