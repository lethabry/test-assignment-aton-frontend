import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { getClients, login } from '../utils/api';

export default function Authorization() {
  const navigate = useNavigate();

  const {
    values: userState,
    handleChange: handleChange,
    errors: errorsState,
    isValid: isValid,
  } = useForm({ login: '', password: '' });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ login: userState.login, password: userState.password })
      .then(() => {
        getClients();
        navigate('/clients', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Авторизация</h2>
      <form
        className="auth__form form"
        action=""
        method="submit"
        name="authorization"
        onSubmit={handleSubmit}
      >
        <div className="form__group">
          <label htmlFor="login">Логин:</label>
          <input
            type="text"
            minLength={2}
            maxLength={32}
            required
            id="login"
            name="login"
            placeholder="Введите логин"
            onChange={handleChange}
            value={userState.login || ''}
          />
          <span className="auth__error">{errorsState.login}</span>
        </div>
        <div className="form__group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            minLength={6}
            required
            placeholder="Введите пароль"
            onChange={handleChange}
            value={userState.password}
          />
          <span className="auth__error">{errorsState.password}</span>
        </div>
        <button
          type="submit"
          className="auth__button"
          aria-label="Кнопка авторизации"
          disabled={!isValid}
        >
          Войти
        </button>
      </form>
    </section>
  );
}
