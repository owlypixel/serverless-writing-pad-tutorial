import React, { useEffect, useState } from "react";
import axios from "axios";
import Note from '../components/note';
import Form from '../components/form';
import './index.css';

export default () => {
  const [status, setStatus] = useState("loading");
  const [notes, setNotes] = useState(null);
  useEffect(() => {
    let canceled = false;
    if (status != "loading") return;
    axios("/api/get-all-notes").then(result => {
      if (canceled === true) return;
      
      if (result.status != 200) {
        console.error("Error loading notes");
        console.error(result);
        return;
      }
      setNotes(result.data.notes);
      setStatus("loaded");
    });

    return () => {
      canceled = true;
    };
  }, [status]);

  const reloadNotes = () => setStatus('loading');

  return (
    <main>
      <h1>The Writing Pad</h1>
      <Form reloadNotes={reloadNotes}/>
      {notes ? (
        <ul>
          {notes.map(note => (
            <li key={note._id}>
              <Note note={note} reloadNotes={reloadNotes}/>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading notes...</p>
      )}
    </main>
  );
};
