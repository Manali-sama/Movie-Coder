import React from 'react'

function Dropdown({title, options, funct}) {
  return (
    <div className='select'>
      <select defaultValue="0" onChange={funct} name="format" id="format">
        <option value="0" disabled>
            {title}
        </option>
        {options.map((o,i)=>
        <option key={i} value={o}>
            {o.toUpperCase()}
        </option>)}
      </select>
    </div>
  )
}

export default Dropdown
