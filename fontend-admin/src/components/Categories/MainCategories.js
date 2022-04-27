import React from "react";
import CreateCategory from "./CreateCategory";

const MainCategories = () => {
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Categories</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            <CreateCategory />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCategories;
