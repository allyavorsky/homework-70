import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [message, setMessage] = useState("Очікування дій...");
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/register", {
        email: registerEmail,
        password: registerPassword,
      });
      setMessage(response.data);
    } catch (error) {
      if (error.response && error.response.data.messages) {
        const errorMsg = Object.values(error.response.data.messages).join(", ");
        setMessage(`Помилка реєстрації: ${errorMsg}`);
      } else {
        setMessage(
          "Помилка реєстрації: " + (error.response?.data || "Невідома помилка")
        );
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email: loginEmail,
        password: loginPassword,
      });
      setMessage(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      setMessage(
        "Помилка входу: " +
          (error.response?.data || "Неправильний email або пароль")
      );
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/logout");
      setMessage(response.data);
      setIsLoggedIn(false);
      setUsers([]);
    } catch (error) {
      setMessage(
        "Помилка виходу: " + (error.response?.data || "Невідома помилка")
      );
    }
  };

  const getProtectedData = async () => {
    try {
      const response = await axios.get("/protected");
      setMessage(response.data);
    } catch (error) {
      setMessage("Помилка: " + (error.response?.data || "Доступ заборонено"));
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
      setMessage("Список зареєстрованих користувачів:");
    } catch (error) {
      setUsers([]);
      setMessage(
        "Помилка отримання користувачів: " +
          (error.response?.data || "Доступ заборонено")
      );
    }
  };

  return (
    <div className="App">
      <h1>Full Stack React App</h1>
      <div id="status-message">{message}</div>

      <h2>Реєстрація</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          placeholder="Пароль"
          required
        />
        <button type="submit">Зареєструватися</button>
      </form>

      <h2>Вхід</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          placeholder="Пароль"
          required
        />
        <button type="submit">Увійти</button>
      </form>

      <h2>Захищені дії</h2>
      <button onClick={getProtectedData}>Отримати секретні дані</button>
      <button onClick={handleLogout}>Вийти</button>
      <button onClick={getUsers}>Отримати список користувачів</button>

      {users.length > 0 && (
        <div id="users-list-container">
          <ul>
            {users.map((user) => (
              <li key={user._id || user.email}>{user.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
