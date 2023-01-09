import React, { Component } from "react";
import Note from "./Note";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import crud from "../service/ServiceJS";

export class Notes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      content: "",
    };
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentDidMount() {
    crud.getNotes().then((response) => {
      this.setState({ notes: response });
    }).catch(e => console.error('Error: ', e));
  }

  handleSubmit(e) {
    e.preventDefault();
    const obj = {
      content: this.state.content,
    };
    crud.createNote(obj).then((status) => {
      if(status === 204) {
        crud.getNotes().then((response) => {
          this.setState({ notes: response });
        }).catch(e => console.error('Error: ', e));
      }
    })
    this.setState({ content: "" });
    this.setState({ id: "" });
  }

  handleChange(e) {
    this.setState({ content: e.target.value });
  }

  deleteNote(e, id) {
    e.preventDefault();
    crud.deleteNote(id).then((status) => {
      if(status === 204) {
        crud.getNotes().then((response) => {
          this.setState({ notes: response })
        })
      }
    }).catch(e => console.error('Error: ', e));
  }  

  render() {
    console.log(this.state.notes);
    return (
      <div>
        <div className="all-notes">
          {this.state.notes.map((note) => (
            <Note
              key={note.id}
              content={note.content}
              id={note.id}
              deleteNote={(e, id) => this.deleteNote(e, id)}
            />
          ))}
        </div>
        <div>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label>New note</label>
            <textarea
              type="text"
              value={this.state.content}
              onChange={(e) => this.handleChange(e)}
              placeholder="Введите текст"
              rows={7}
              spellCheck="true"
              minLength={1}
              maxLength={10000}
              style={{
                maxWidth: "600px",
                minWidth: "300px",
                maxHeight: "300px",
                minHeight: "100px",
              }}
              autoFocus
              required
            />
            <button type="submit">
              <FlightLandIcon />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Notes;
