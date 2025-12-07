import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/api";
import '../App.css';

export default function CreateProjectPage() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const createProject = async (e) => {
    e.preventDefault();
    if (!title || !desc) {
      setError("Заполните все поля");
      return;
    }
    setError("");

    const token = localStorage.getItem("token");
    const data = await apiRequest("/projects", "POST", { title, description: desc }, token);

    if (data.success) {
      navigate("/projects"); // перенаправление на список проектов
    } else {
      setError("Ошибка создания проекта");
    }
  };

  const goBack = () => {
    navigate("/projects"); // кнопка назад возвращает к списку проектов
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Создание нового проекта</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={createProject} className="login-form">
        <input
          placeholder="Название"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="login-input"
        />
        <textarea
          placeholder="Описание"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          className="login-input"
        />
        <div className="button-group">
          <button type="submit" className="login-button">Создать</button>
          <button type="button" className="login-button" onClick={goBack}>Назад</button>
        </div>
      </form>
    </div>
  );
}