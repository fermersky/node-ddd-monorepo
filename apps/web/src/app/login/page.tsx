'use client';

import { type ChangeEvent, type FormEvent, useState } from 'react';

import { driverLogin } from './actions';
import styles from './page.module.css';

export default function Page() {
  const [formData, setFormData] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;
    if (email && password) {
      await driverLogin({ email, password });
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const previousState = formData;

    setFormData(Object.assign(previousState, { [name]: value }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        onChange={handleInput}
        type="text"
        name="email"
        id="user_email"
        placeholder="alice@example.com"
        className={styles.txtInput}
      />

      <input
        onChange={handleInput}
        type="password"
        name="password"
        id="user_password"
        className={styles.txtInput}
      />

      <input type="submit" name="submit" id="form_submit" className={styles.submitBtn} />
    </form>
  );
}
