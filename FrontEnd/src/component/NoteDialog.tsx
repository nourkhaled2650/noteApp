import React from "react";

interface showDialog {
  show: boolean;
}
export const NoteDialog = (show: showDialog) => {
  return (
    <div style={show.show ? { display: "flex" } : { display: "none" }}>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className="form-control" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
          />
        </div>
        <div className="form-group">
          <button className="form-control btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>

      {/* <form>
        <label htmlFor="">title</label>
        <input type="text" />
        <label htmlFor="">text</label>
        <textarea rows={4} cols={40} />
        <input type="submit" />
      </form> */}
    </div>
  );
};
