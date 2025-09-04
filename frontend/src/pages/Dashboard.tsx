import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api/api";
import { useAuth } from "../context/AuthContext";
import "../css/Dashboard.css"; 

interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await apiRequest("/notes", "GET", undefined, token || "");
        setNotes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchNotes();
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = async (id: string) => {
    try {
      await apiRequest(`/notes/${id}`, "DELETE", undefined, token || "");
      setNotes(notes.filter((n) => n._id !== id));
      alert('Note is Deleted')
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>My Notes</h2>
        <div className="dashboard-header">
      <button onClick={logout}>Logout</button>
      </div>
      </div>
       <input placeholder="Search by title or tag..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <Link to="/notes/new" className="add-note"> + Add Note </Link>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <ul className="notes-list">
          {filtered.map((note) => (
            <li key={note._id}>
              <h3>{note.title}</h3>
              <p className="content">{note.content}</p>
              <p className="tags">Tags: {note.tags.join(", ")}</p>
              <div className="actions">
                <Link to={`/notes/edit/${note._id}`}>Edit</Link>
                <button onClick={() => handleDelete(note._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}<br/>
      
    </div>
  );
}
