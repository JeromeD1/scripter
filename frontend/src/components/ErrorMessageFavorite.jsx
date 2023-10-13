import React from "react"
import { Link } from "react-router-dom"

import croix from "../assets/images/Close.svg"

import "./ErrorMessageFavorite.scss"

const ErrorMessageFavorite = ({
  setChangeClassToShowErrorFollow,
  setChangeClassToShowErrorFavorite,
  message,
}) => {
  const HandleCloseFormErrorMessage = () => {
    setChangeClassToShowErrorFavorite(false)
    setChangeClassToShowErrorFollow(false)
  }

  return (
    <div className="popUpErrorMessage">
      <form className="Message">
        <div className="imgcontainer">
          <img
            src={croix}
            className="cursorHover"
            alt="fermer la fenetre"
            onClick={HandleCloseFormErrorMessage}
          />
        </div>
        <div className="containerForm">
          <h2>Caution</h2>
          <div className="conteneurSVG">
            <svg>
              <line x1="0" x2="200" y1="0" y2="0" />
            </svg>
          </div>
          <div className="ErrorMessage">
            <div className="ErrMessage">
              <p>Please log in to {message}</p>
            </div>
          </div>
          {/* <Link to="/login">
            <button type="button">Go to Log In</button>
          </Link> */}
          <button
            type="button"
            onClick={HandleCloseFormErrorMessage}
            className="cursorHover"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  )
}

export default ErrorMessageFavorite
