
import React from 'react'

import './TitleCatagory.scss'

function TitleCatagory({children}) {
  return (
    <div className="TitleCataggory">
        <h2>{children}</h2>
    </div>
  )
}

export default TitleCatagory