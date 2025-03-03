import React, { useState, useEffect } from 'react';
import './App.css';
import { getNotes, createNote, updateNote, deleteNote } from './apiService';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getNotes()
      .then(data => setNotes(data))
      .catch(error => {
        console.error('Error fetching notes:', error);
        setError('Failed to fetch notes. Please try again later.');
      });
  }, []);

  const generateNewId = () => {
    if (notes.length === 0) return 1;
    const ids = notes.map(note => note.id);
    let newId = Math.max(...ids) + 1;
    while (ids.includes(newId)) {
      newId += 1;
    }
    return newId;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (title.length < 3) {
      alert("Title must be at least 3 characters long");
      return;
    }
    if (content.length < 10) {
      alert("Content must be at least 10 characters long");
      return;
    }

    const note = { title, content, date };

    if (editId) {
      note.id = editId; // Ensure the id is included in the payload
      updateNote(note)
        .then(updatedNote => {
          setNotes(notes.map(n => (n.id === editId ? updatedNote : n)));
          resetForm();
        })
        .catch(error => {
          console.error('Error updating note:', error);
          setError('Failed to update note. Please try again later.');
        });
    } else {
      note.id = generateNewId();
      createNote(note)
        .then(newNote => {
          setNotes([...notes, newNote]);
          resetForm();
        })
        .catch(error => {
          console.error('Error adding note:', error);
          setError('Failed to add note. Please try again later.');
        });
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setDate('');
    setEditId(null);
    setError('');
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setDate(note.date);
    setEditId(note.id);
  };

  const handleDelete = (id) => {
    deleteNote(id)
      .then(() => {
        setNotes(notes.filter(note => note.id !== id));
      })
      .catch(error => {
        console.error('Error deleting note:', error);
        setError('Failed to delete note. Please try again later.');
      });
  };

  return (
    <div className="App">
      <h1>Notes</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Update' : 'Add'} Note</button>
        {editId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content ? note.content.substring(0, 100) : 'No content'}...</p>
            <p>{note.date}</p>
            <button onClick={() => handleEdit(note)}>Edit</button>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;