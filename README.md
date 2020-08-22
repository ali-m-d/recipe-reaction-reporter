# README

A web application that allows visitors to browse and contribute to an open database of recipes, and provides logged-in users with the ability to report their reactions to recipes, built using React, Rails 6 and PostgresQL.

The landing page features a call-to-action button that toggles a modal containing a registration form, and a further call-to-action button that redirects the user to the paginated index of available recipes. Subtle animations are achieved by means of React hooks and the GSAP library.
                    
Visitors can access the form for uploading a recipe of their own by following the link in the Navbar. The form accomodates an arbitrary number of ingredients by dynamically adding a text input field every time the Add Ingredient button is clicked. On the server side, the controller for the New Recipe action parses the form data sent via the Fetch API and uploads the image provided by the user to a separate hosting platform, storing the URL necessary for retrieval in the database.

When components are mounted, a method in the App component makes a request to the Sessions controller in order to determine whether the user has been authenticated, and passes the loggedInStatus as props to the Navbar component, which displays either a Login or Logout button depending on the response from the server.

The Login button allows non-authenticated users to authenticate themselves at any time by toggling a modal containing a login form. Only authenticated users can access the form for reporting a reaction to a recipe by clicking the button in the view for individual recipes. New reactions are dynamically prepended to the list of reactions for the recipe 
currently being viewed.

When the user, after having viewed the details of an individual recipe, returns to the paginated list of recipes, they are presented with the page that they were previously browsing. This is achieved by lifitng the state of the Recipe component up to the App component by means of callback functions.
