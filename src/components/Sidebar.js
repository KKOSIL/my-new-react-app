import React from "react";
import './Sidebar.css';

function Sidebar(){
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>프로젝트</h3>
      </div>
      <ul className="project-list"   >
        <li># What's My SERP</li>
        <li># HOME project</li>
        <li># UI Flip</li>
      </ul>
    </div>
  );
}

export default Sidebar;