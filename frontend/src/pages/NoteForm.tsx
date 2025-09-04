import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../api/api";
import { useAuth } from "../context/AuthContext";
import '../css/NoteForm.css'

export default function NoteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      apiRequest(`/notes/${id}`, "GET", undefined, token || "")
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
          setTags(data.tags.join(", "));
        })
        .catch((err) => setError(err.message));
    }
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = { title, content, tags: tags.split(",").map((t) => t.trim()) };
      if (id) {
        await apiRequest(`/notes/${id}`, "PUT", body, token || "");
      } else {
        await apiRequest("/notes", "POST", body, token || "");
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (

    <div className="note-form-container">
      <form onSubmit={handleSubmit}>
        <h2>{id ? "Edit Note" : "Add Note"}</h2>
        {error && <p className="error">{error}</p>}
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <input type="text" placeholder="Tags" value={tags} onChange={(e) => setTags(e.target.value)} />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button><br /><br />
        <button type="button" onClick={() => navigate("/dashboard")}>Back</button>
      </form>
    </div>
  );


}
