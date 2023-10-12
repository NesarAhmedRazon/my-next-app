import React from "react";

export default function TemplatePartNotFound() {
  return (
    <>
      <main className={`bodyContainer site-body single type-page`}>
        <article id="notFound" className="type-page">
          <div className="row">
            <div className="column one"></div>
            <div className="column ten">
              <h1 className="entry-title">Page Not Found</h1>
            </div>
            <div className="column one"></div>
          </div>
        </article>
      </main>
    </>
  );
}
