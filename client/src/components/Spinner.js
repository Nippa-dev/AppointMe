//import { useState, CSSProperties } from "react";
//import ClipLoader from 'react-spinners/ClipLoader'
import '../index.css'

import React from 'react'

function Spinner() {
    return (
        <div className="d-flex justify-content-center spinnerx">
            <button class="btn btn-primary spinner" type="button" disabled>
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button>
        </div>
    )
}

export default Spinner;
