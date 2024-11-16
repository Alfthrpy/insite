// pages/AuthPage.tsx

'use client'

import './auth.css'
import React, { useState } from 'react';
import FormLogin from './loginForm';
import FormSignUp from './registerForm';

const AuthPage = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleToggleMode = () => {
    setIsSignUpMode((prevMode) => !prevMode);
  };

  return (
    <main className={isSignUpMode ? 'sign-up-mode' : ''}>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            {!isSignUpMode ? (
              <FormLogin onToggleMode={handleToggleMode} />
            ) : (
              <FormSignUp onToggleMode={handleToggleMode} />
            )}
          </div>

          <div className="carousel">
            <div className="images-wrapper">
              <img
                src="./img/wedding-couple (1).png"
                className={`image img-1 show`}
                alt=""
              />
            </div>

            <div className="text-slider">
              <div className="text-wrap">
                <div className="text-group">
                  <h2>Create your own invitation</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;
