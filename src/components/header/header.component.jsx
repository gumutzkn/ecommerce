import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import "./header.styles.scss";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import axios from "axios";

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
  constructor(props) {
    super(props);

    this.state = {
      authenticatedUser: null,
    };
  }

  componentDidMount() {
    const instance = axios.create({ withCredentials: true });

    // instance
    //   .get("https://mern-ecommerce-temp.herokuapp.com/")
    //   .then((res) => {
    //     this.setState({ authenticatedUser: res.data.authenticatedUser });
    //   })
    //   .catch((err) => console.log(err));
  }

  render() {
    const { hidden } = this.props;
    const { authenticatedUser } = this.state;
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
          {authenticatedUser ? (
            <div className="option">SIGN OUT</div>
          ) : (
            <Link className="option" to="/signin">
              SIGN IN
            </Link>
          )}
          {/* <Link className="option" to="/signin">
            SIGN IN
          </Link> */}
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
