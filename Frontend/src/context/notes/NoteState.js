import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "https://i-notebook-server-eight.vercel.app";
 // const myApi=process.env.REACT_APP_NOTES_API;
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  
  
  //Get all notes
  
  const getNotes = async () => {
    const response = await fetch(`https://${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };


  //Add a note
  const addNote = async (title, description, tag) => {
    // API call
    
    const response = await fetch(`https://${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    
     const note =await  response.json(); 
    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`https://${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":  localStorage.getItem('token')
      },
    });
    const json = response.json();
    console.log(json);
    // TODO- api call
    console.log("deleting the nod with id" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
  
    const response = await fetch(`https://${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
  const json=await response.json();
  console.log(json);
  
    let newNotes=JSON.parse(JSON.stringify(notes));
         //logic to edit client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
      }

    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
