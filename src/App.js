import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//redux
import { connect } from "react-redux";

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in and sign-up/sign-in and sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";

import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "./redux/user/user.selector";

import { checkUserSession } from "./redux/user/user.actions";
// [Moving our data -> firestore] -- 1). imports
// import { addCollectionAndDocuments } from "./firebase/firebase.utils";
// import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

import { GlobalStyle } from "./global.styles";
import AboutPage from "./pages/about/about.component";

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  // unsubscribeFromAuth = null;

  // componentDidMount() {
  //   const { checkUserSession } = this.props;
  //   checkUserSession();

  // }

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // [Moving our data -> firestore] -- 2). select collections [] using our selector
  // collectionsArray: selectCollectionsForPreview,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
