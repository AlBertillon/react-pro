import * as yup from "yup";

export const registrationSchema = yup.object({
  username: yup
    .string()
    .required("Имя пользователя обязательно")
    .min(3, "Минимум 3 символа")
    .max(30, "Максимум 30 символов"),
  email: yup
    .string()
    .required("Email обязателен")
    .email("Введите корректный email"),
  password: yup
    .string()
    .required("Пароль обязателен")
    .min(6, "Минимум 6 символов"),
  confirmPassword: yup
    .string()
    .required("Подтвердите пароль")
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
  socialLinks: yup
    .array()
    .of(
      yup.string().url("Некорректный URL").nullable()
    )
    .default([]),
});

export type RegistrationValues = yup.InferType<typeof registrationSchema>;

export const initialRegistrationValues: RegistrationValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  socialLinks: [""],
};