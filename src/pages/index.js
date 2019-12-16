import React, {Fragment} from "react"
import { Link } from "gatsby"
// import stories from "../../data/stories.json"
import Layout from "../components/layout"


const stories = [
        {
            "link": "12-seconds",
            "title": "12 seconds of gunfire: the true story of a school shooting",
            "short_title": "12 seconds of gunfire",
            "url": "http://wapo.st/12seconds",
            "url_title": "Visit the \"12 seconds\" project",
            "description": ["“12 seconds of gunfire: The true story of a school shooting” is a powerful virtual reality (VR) film that premiered at the Tribeca Film Festival in 2018. It was illustrated and animated entirley in VR and then rendered as a 360 video and as a traditional theatrical short film. It has played in both formats at film festivals around the world.", "The short film recounts what happened to Jacob Hall and Ava Olsen, who were first-graders when a 14-year-old boy opened fire on their school playground at recess. It uses VR to take the viewer through the circumstances surrounding this tragedy."],
            "role": "Co-director, co-producer, technical lead",
            "media":[
                {
                    "type":"video",
                    "sources": [ {"src":"JacobDrawIn.mp4", "type":"video/mp4"}],
                    "alt":"Animation of boy swining on swing",
                    "classes":"w-70-l"
                },

                {
                    "src": "12SecondsofGunfire_whitelaurelsV2.png",
                    "alt":"Film Festival Laurels",
                    "classes":"w-33-l "
                }
            ],
            "tags": [
                "VR"
            ]
        },
        {
            "link": "bears-ears",
            "title": "What remains of Bears Ears",
            "short_title": "What remains of Bears Ears",
            "url": "http://wapo.st/bears-ears",
            "url_title": "Visit the \"Bears Ears\" project",
            "description": ["A visually driven investigation of Utah’s politically contentious southeast corner. A remote part of the United States is vidily brought to life using drone footage, large scale photogrammetry and augmented reality. Readers can explore geographic, archeological and cultural resources from their browser."],
            "role": "Drone pilot, 3-D web developer",
            "media":[
                {
                    "type":"video",
                    "sources": [ {"src":"BearsEarsScreenCap.mp4", "type":"video/mp4"}],
                    "alt":"Screen recording of the Bears Ears project web site",
                    "classes":"vh-50 w-30-l"
                },
                {
                    "src": "bears-ears-model-annotations.jpg",
                    "alt":"An image of the Bears Ears project web site showing a 3-D model of a cliff dwelling",
                    "classes":"vh-50 w-70-l",
                    "caption":"Interactive photogrammetry reconstruction of a cliff dwelling with annotations"
                }
            ],
            "media_classes": "flex-l",
            "tags": [
                "AR, Drone, 3D, Photogrammetry"
            ]
        },
        {
            "link": "dino-in-the-basement",
            "title": "A mystery dinosaur in the basement",
            "short_title": "A mystery dinosaur in the basement",
            "url": "https://www.washingtonpost.com/graphics/2018/national/smithsonian-dinosaur-augmented-reality/",
            "url_title": "See the Mystery Dino project",
            "description": ["This strange skull may have come from a rare dinosaur — or from a Triceratops with an odd nose.","Readers can walk around this fossil - no long on display - in their own space by using Augmented Reality. Or they can see interesting parts of the skull annotated on a 3-D model while they read about the history of this dinosaur."],
            "role": "Photogrammetry capture, 3-D web developer",
            "media":[
                {
                    "type":"video",
                    "sources": [ {"src":"Dino-lapse-trimmed.mp4", "type":"video/mp4"}],
                    "alt":"Time lapse of a photogrammety capture of a dino skull",
                    "classes":"w-70-l",
                    "caption": "Time lapse of the photogrammetry capture process"
                },
                {
                    "type":"video",
                    "sources": [ {"src":"dino-screen-cap.mp4", "type":"video/mp4"}],
                    "alt":"Screen capture of mystery dino website",
                    "classes":"w-70-l"
                }
            ],
            "tags": [
                ""
            ]
        },
        {
            "link": "food-truck",
            "title": "What's in a food truck?",
            "short_title": "What's in a food truck?",
            "url": "https://www.washingtonpost.com/graphics/2018/food/food-trucks/",
            "url_title": "Visit the food truck project",
            "description": ["Explore the view from inside a food truck using scroll based animations and 360 photography"],
            "role": "Web Developer, videographer, 360 photographer",
            "tags": [
                ""
            ],
            "media":[
                {
                    "type":"video",
                    "sources": [ {"src":"Foodtruckscroll.mp4", "type":"video/mp4"}],
                    "alt":"A screen recording of the food truck project website",
                    "classes":"w-70-l",
                    "caption":"Scrolling interaction explaining different parts of the food truck"
                },
                {
                    "type":"video",
                    "sources": [ {"src":"food-truck-loop.mp4", "type":"video/mp4"}],
                    "alt":"A time lapse of chefs making crepes in a food truck kitchen",
                    "classes":"w-70-l",
                    "caption": "A time lapse of chefs making crepes in a food truck kitchen"
                }
            ],
            "awards": "James Beard Award Nomination"
        },
        {
            "link": "sin-luz",
            "title": "Sin Luz: Life without power in the longest blackout in U.S. history",
            "short_title": "Sin Luz: Life without power",
            "url": "https://www.washingtonpost.com/graphics/2017/national/puerto-rico-life-without-power/",
            "url_title": "Visit the Sin Luz project",
            "description": ["Puerto Ricans are in limbo. Millions still have no safe water, schools remain shut and the tasks of daily life are exhausting and dangerous. Full electricity may be months way."],
            "role": "Drone pilot, photogrammetry capture/model reconstruction, web developer",
            "media":[
                {
                    "type":"video",
                    "sources": [ {"src":"SinLuzDrone.mp4", "type":"video/mp4"}],
                    "alt":"Drone footage of the aftermath of hurricane Maria in Puerto Rico",
                    "classes":"w-70-l",
                    "caption": "Drone footage of the aftermath of hurricane Maria in Puerto Rico"
                },
                {
                    "type":"video",
                    "sources": [ {"src":"SinLuzScreenRecording.mp4", "type":"video/mp4"}],
                    "alt":"Screen recording of the scroll interaction showing video and 3-D reconstruction of hurricane damage on the Sin Luz webpage",
                    "classes":"w-70-l",
                    "caption": "Scroll interaction showing video and 3-D reconstruction of hurricane damage"
                }
            ],
            "tags": [
                ""
            ],
            "awards": "Emmy Nomination, World Press Photo Silver Medal, Scripts Howard Award for Multimedia Reporting"
        }
    ];


function StoryLink({ short_title, link }) {
    let style = {
        "color": "#e9585d",
        "borderBottom": "1px dotted",
        "cursor": "pointer",
        "textDecoration": "none",
    }
    return <h3 className="serif f2 di mt1 mb1"><Link style={style} to={`./${link}`}>{short_title}</Link></h3>
}

export default () => {
    const linkStyle = {
        "textDecoration": "none",
        "borderBottom": "dotted 1px",
        "flexShrink": 1
    };
    const spacerChar = (<span className="dib mt1 mb1 pt2 pb2 ml2 mr2 f3">◇</span>);
    return (
        <Layout>
            <main className="flex-l">
                <div className="w-30-l w-100 db">
                    <p className="sans-serif f5 lh-copy">
                        Creating award winning projects using AR, VR, photogrammetry, drones, interactive video and other emerging technolgies. Technical leadership to drive impactful journalism
                     </p>
                    <div className="">
                        <h5 className="sans-serif f5 mt1 mb1">Contact</h5>
                        <a className="normal dib mb1 mr3 sans-serif f6 lh-copy" style={linkStyle} href="http://twitter.com/sethblanchard">@SethBlanchard</a>
                        <a className="normal dib sans-serif f6 lh-copy" style={linkStyle} href="mailto:blanchard.seth@gmail.com">blanchard.seth@gmail.com</a>
                    </div>
                </div>
                <section className="w-70-l w-100 db pl5-l mt0-l mt4  mb5">
                    <h3 className="serif f2 di mt1 mb1 pa1 o-60">Selected Projects: </h3>
                    {stories.map(storyData => <StoryLink key={storyData.url} {...storyData} />).reduce((accu, elem) => {
                        return accu === null ? [elem] : [...accu, spacerChar, elem]
                    }, null)}
                </section>
            </main>
        </Layout>
    );
}
