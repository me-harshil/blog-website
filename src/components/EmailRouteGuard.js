import React from "react";
import UnauthorizedPage from "./UnauthorizedPage";
import AddPost from "./AddPost";

const EmailRouteGuard = ({ allowedEmail, userEmail, showAlert }) => {
  if (userEmail === allowedEmail) {
    return <AddPost showAlert={showAlert} />;
  } else {
    // Redirect to a page indicating unauthorized access
    return <UnauthorizedPage />;
  }
};

export default EmailRouteGuard;
