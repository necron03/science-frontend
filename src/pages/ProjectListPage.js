import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/api";
import '../App.css';

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const token = localStorage.getItem("token");
    const data = await apiRequest("/projects", "GET", null, token);
    setProjects(data || []);
  }

  const goToCreate = () => navigate("/projects/create");
  const goBack = () => navigate(-1);

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto' }}>
      <h2>Мои проекты</h2>
      <button className="login-button" onClick={goToCreate}>Создать новый проект</button>
      <button className="login-button" onClick={goBack} style={{ marginLeft: '10px' }}>Назад</button>

      <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
        {projects.length === 0 && <li>Проектов пока нет</li>}
        {projects.map(proj => (
          <li key={proj.id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}