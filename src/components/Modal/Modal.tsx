import React from 'react'
import './Modal.css';
export default function Modal({ toggleModal, children }: { toggleModal: (show: boolean) => void, children?: React.ReactNode }) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && toggleModal(false)}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="success-icon">
          <svg
          fill=""
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.011,9.011,0,0,1,12,21ZM17.737,8.824a1,1,0,0,1-.061,1.413l-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,0,1,1.415-1.414l2.323,2.323,5.294-4.853A1,1,0,0,1,17.737,8.824Z"></path>
          </g>
        </svg>
          </div>
          <div>
            <h2 className="modal-title">Order Confirmed</h2>
          </div>
        </div>
        
        <p className="modal-subtitle">We hope you enjoy your food!</p>
        {children}
      </div>
    </div>
  )
}
