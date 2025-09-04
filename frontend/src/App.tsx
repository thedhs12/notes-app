import { BrowserRouter, Routes, Route} from "react-router-dom";
import { AuthProvider} from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NoteForm from "./pages/NoteForm";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/notes/new" element={<NoteForm />}/>
          <Route path="/notes/edit/:id" element={ <NoteForm />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
