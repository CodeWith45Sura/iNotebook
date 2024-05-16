import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";


const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  
  const [note, setNote]=useState({title:"",description:"",tag:""})
  
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    console.log("added successfully");
    setNote({title:"",description:"",tag:""})
    props.showAlert('added successfully','success');
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-2" >
      <h2>Add a Note</h2>
      <form className="mt-3"  action="">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              minLength={5}
              required
              value={note.tag}
            />
          </div>
          <button
          disabled={note.title.length <5 || note.description.length <5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            style={{boxShadow:' 3px 3px 5px rgba(41, 35, 35, 0.495),inset -3px -3px 5px rgb(94, 25, 25)'}}
          >
            Add Note
          </button>
        
      </form>
    </div>
  );
};

export default AddNote;
