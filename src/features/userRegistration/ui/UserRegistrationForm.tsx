import { Formik, FieldArray } from "formik";
import type { RegistrationValues } from "features/userRegistration/model/validation";

import { registrationSchema, initialRegistrationValues } from "features/userRegistration/model/validation";

import styles from "./UserRegistrationForm.module.css";

interface UserRegistrationFormProps {
  onSubmit: (values: RegistrationValues) => void;
}

export const UserRegistrationForm = ({ onSubmit }: UserRegistrationFormProps) => {
  return (
    <Formik
      initialValues={initialRegistrationValues}
      validationSchema={registrationSchema}
      onSubmit={onSubmit}
      validateOnBlur
      validateOnChange
    >
      {({ errors, touched, handleSubmit, handleChange, handleBlur, values }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Регистрация</h2>

          <div className={styles.field}>
            <label htmlFor="username">Имя пользователя</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Введите имя"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.username && errors.username && (
              <span className={styles.error}>{errors.username}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@mail.ru"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Введите пароль"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword">Подтверждение пароля</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Повторите пароль"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>

          <div className={styles.socialLinksSection}>
            <label>Ссылки на социальные сети</label>
            <FieldArray
              name="socialLinks"
              render={(arrayHelpers) => (
                <div>
                  {values.socialLinks && values.socialLinks.map((link, index) => (
                    <div key={index} className={styles.socialLinkRow}>
                      <input
                        name={`socialLinks[${index}]`}
                        type="url"
                        placeholder="https://example.com"
                        value={link || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={(errors.socialLinks && (errors.socialLinks as string[])[index]) ? styles.inputError : undefined}
                      />
                      {(touched.socialLinks as any)?.[index] && (errors.socialLinks as string[] | undefined)?.[index] && (
                        <span className={styles.error}>{(errors.socialLinks as string[])[index]}</span>
                      )}
                      {values.socialLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className={styles.removeButton}
                          aria-label={`Удалить ссылку ${index + 1}`}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push("")}
                    className={styles.addButton}
                    >
                    + Добавить ссылку
                  </button>
                </div>
              )}
            />
          </div>

          <button type="submit" className={styles.button}>
            Зарегистрироваться
          </button>
        </form>
      )}
      </Formik>
  );
};
  