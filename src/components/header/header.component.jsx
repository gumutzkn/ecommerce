import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import "./header.styles.scss";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

// const Header = ({ hidden }) => {
//   return (
//     <div className="header">
//       <Link className="logo-container" to="/">
//         <Logo className="logo" />
//       </Link>

//       <div className="options">
//         <Link className="option" to="/">
//           HOME
//         </Link>
//         <Link className="option" to="/shop">
//           SHOP
//         </Link>
//         <Link className="option" to="/signin">
//           SIGN IN
//         </Link>
//         <Link className="option" to="/signin">
//           SIGN OUT
//         </Link>
//         <CartIcon />
//       </div>
//       {hidden ? null : <CartDropdown />}
//     </div>
//   );
// };

class Header extends Component {
  logout = () => {
    localStorage.removeItem("auth_token");
    window.location.reload();
  };

  render() {
    const { hidden } = this.props;
    return (
      <div className="header">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>

        <div className="options">
          <Link className="option" to="/">
            HOME
          </Link>
          <Link className="option" to="/shop">
            SHOP
          </Link>
          {localStorage.getItem("auth_token") && (
            <div className="option" onClick={this.logout}>
              SIGN OUT
            </div>
          )}

          {!localStorage.getItem("auth_token") && (
            <Link className="option" to="/signin">
              SIGN IN
            </Link>
          )}

          <CartIcon />
        </div>
        {hidden ? null : <CartDropdown />}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
