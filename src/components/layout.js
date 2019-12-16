import React from "react"
import { Link } from "gatsby"
import "./Tachyons.4.11.2.css"
import "./layout.css"

export default ({ children }) => (
  <div id="root">
    <h1 className="f-headline-ns f-4 lh-solid sans-serif" ><Link style={{color:"#8eb4c6"}} to="/">Seth Blanchard</Link></h1>
    {children}
  </div>
)