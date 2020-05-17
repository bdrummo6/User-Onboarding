import React from 'react';

import './App.css';

import UserForm from "./components/Form";

function App() {
   
   document.title = 'User Onboarding App';
   
   return (
      <div className="App">
         <UserForm />
      </div>
   );
}

export default App;
