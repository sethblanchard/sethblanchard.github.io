import React, { Fragment } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

export default ({ pageContext: { story }}) => {
   const { url,
   url_title,
   short_title,
   description,
   role,
   media_classes,
   awards,
   media } = story;
    let style = {
      "borderBottom": "1px dotted"
    }
  return (
    <Layout>
    <section className="flex-l">
      <div className="w-30-l w-100 db">
      <span className="dib dn-l mt0 mb3 pt2 pb2 ml2 mr2 f3">◇</span>
      <h3 className="dn-l di serif f2 di mt0 mb3 " style={style}>{short_title}</h3>
      <span className="dib dn-l mt0 mb3 pt2 pb2 ml2 mr2 f3">◇</span>
        <h5 className="sans-serif f5 mt0 mb1">Project Overview</h5>
        <a className="normal dib no-underline mb1" target="_blank" rel="noopener noreferrer" style={style} href={url}>{url_title}</a>
        {description.map(txt => <p className="mt2 sans-serif f5 lh-copy">{txt}</p> )}
        <h5 className="sans-serif f5 mt3  mb1">Role</h5>
        <p className="mt0  sans-serif f5 lh-copy">
          {role}
        </p>
        {awards &&
        (<Fragment><h5 className="sans-serif f5 mt0 mb1">Awards/Nominations</h5>
        <p className="mt0  sans-serif f5 lh-copy">{awards}</p>
        </Fragment>)}
        <Link 
          to="/"
          className=" op--2 mt2 f5 primary bg-dark bg-animate bg-primary-hover dark-hover inline-flex items-center pa2 ba b--primary border-box br2">
          <svg className="w1" data-icon="chevronLeft" viewBox="0 0 32 32" style={{"fill":"currentcolor"}}>
            <title>chevronLeft icon</title>
            <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z"></path>
          </svg>
          <span className="pl1">Back</span>
        </Link>
      </div>
      <div className="w-70-l w-100 db pl5-l mt0-l mt4">

          <span className="dn dib-l mt0 mb3 pt2 pb2 ml2 mr2 f3">◇</span>
          <h3 className="di-l dn serif f2 mt0 mb3 " style={style}>{short_title}</h3>
          <span className="dn dib-l mt0 mb3 pt2 pb2 ml2 mr2 f3">◇</span>
          <div className={media_classes || ""}>
            {media && media.map(asset => {
              if(asset.type && asset.type === "video")
              {
                return(<div className={`project-img mb2 ${asset.classes}`}>
                  <video muted="muted" autoplay="autoplay" loop="true" playsinline="true" poster={asset.poster}>
                    {asset.sources.map(src => <source src={src.src} type={src.type} />)}
                  </video>
                  {asset.caption && <p className="mt1 o-80 i serif f6">{asset.caption}</p>}
                </div>)

              }
              return (<div className={`project-img  mb2 ${asset.classes}`}>
                    <img src={asset.src} alt={asset.alt} />
                  {asset.caption && <p className="mt1 o-80 i serif f6">{asset.caption}</p>}
                </div>
                )
            })}
          </div>
      </div>
    </section>
    </Layout>
  )
}