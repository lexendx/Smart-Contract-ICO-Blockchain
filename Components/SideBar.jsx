import React from "react";

const SideBar = () => {
  return <aside className="slide-bar">
<div className="close-mobile-menu">
  <a href="/" className="tx-close"></a>
</div>

<nav className="side-mobile-menu">
  <a href="/" className="header__logo mb-30">
  <img src="assets/img/logo/logo.svg"
  alt="" srcset="" />
  </a>
<div className="header-mobile-search">
<form action="#" role="search">
  <input type="text" placeholder="Search Keyword"/>
  <button type="submit">
<i className="ti-search"></i>

  </button>

</form>

</div>
<ul id="mobile-menu-active"></ul>

</nav>
  </aside>;
};

export default SideBar;
