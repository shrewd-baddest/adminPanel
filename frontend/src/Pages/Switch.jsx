import React from 'react'

const Switch = ({onChange,checked}) => {
  return (
    <div>
           <label className="toggle-switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="toggle-input"
      />
      <div className="toggle-slider"></div>
    </label>
  
    </div>
  )
}

export default Switch