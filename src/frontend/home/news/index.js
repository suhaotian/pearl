import React, { Component } from 'react'
import './news.css'

export default class News extends Component {

  render() {
    return (
      <div>
        {
          this.getData().map(({title, desc}, i) => (
            <div key={i}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))
        }

      </div>
    )
  }
  
  getData = () => {
    return [
      {
        title: 'Our company',
        desc: "You can choose to do your road test in an automatic, but that’ll earn you a restriction on your license, barring you from driving a manual. It’s probably fair, but almost everyone (myself included) chooses to practice in manuals, and do the test in a manual to not have that restriction, which further skews the stats in favor of manuals.",
      },
      {
        title: 'Where we sell to',
        desc: "I got my driver’s license in Sweden, and the official driving handbook completely worships manual transmissions, and makes several untrue claims about how much better they are than automatics.",
      }
    ]
  }
}