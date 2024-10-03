import React from "react";

const SideBar = () => {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add search functionality here if needed
  };

  return (
    <aside className="slide-bar">
      <div className="close-mobile-menu">
        <button className="tx-close" onClick={() => {/* Logic to close the sidebar */}}>
          &times; {/* or any close icon */}
        </button>
      </div>
      <nav className="side-mobile-menu">
        <a href="/" className="header__logo mb-30">
          <img src="assets/img/logo/logo.svg" alt="Logo" />
        </a>
        <div className="header-mobile-search">
          <form action="#" role="search" onSubmit={handleSearchSubmit}>
            <input type="text" placeholder="Search keywords" />
            <button type="submit">
              <i className="ti-search"></i> {/* Fixed the typo here */}
            </button>
          </form>
        </div>
        <ul id="mobile-menu-active">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#about" className="scrollspy-btn">
              About
            </a>
          </li>
          <li>
            <a href="#roadmap" className="scrollspy-btn">
              Roadmap
            </a>
          </li>
          <li>
            <a href="#team" className="scrollspy-btn"> {/* Fixed href here */}
              Team
            </a>
          </li>
          <li>
            <a href="#!" className="scrollspy-btn">
              Blog
            </a>
          </li>
          <li>
            <a href="#!" className="scrollspy-btn">
              Get in touch
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
