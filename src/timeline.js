import React from 'react'
import {Link} from 'react-router-dom'
import './timeline.css'

const Address = ({disabled, linksDisabled, address, location, locationHref}) => {
  console.log(disabled, linksDisabled)
  return <div className='day-contents-address'>
    <p className='day-contents-address-content'>{address}</p>
    {disabled || linksDisabled ? null : <a className='day-contents-address-link' href={locationHref}>{location}</a>}
  </div>
}

const ScheduleRow = ({time, name, open = 'is-open'}) => <div className={`schedule-row ${open}`}>
  <span className='schedule-time'>{time}</span>
  <span className='schedule-name'>{name}</span>
</div>

const Schedule = ({rows}) => <div className='day-contents-schedule'>
  {rows.map((row, index) => <ScheduleRow key={`schedule-row-${index}`} {...row} />)}
</div>

const Day = ({disabled, route, last, title, subtitle, active, label, contents, name}) => {
  return <div className={`day ${active}`}>
    {!disabled ? <Link to={`/${route}/${name}`}>
      <div className='day-date'>
        <span className='day-date-label'>{label}</span>
      </div>
    </Link> : null}
    {last ? null : <div className='line' />}
    <div className='day-contents'>
      <div className='day-contents-expanded'>
        <div className='day-contents-title'>{contents.title}</div>
        { contents.address ? <Address {...contents} disabled={disabled} active={active} /> : null }
        { contents.schedule ? <Schedule rows={contents.schedule} /> : null }
      </div>
      <div className='day-contents-collapsed'>
        <div className='day-contents-collapsed-title'>{title}</div>
        {subtitle ? <div className='day-contents-collapsed-sub-title'>{subtitle}</div> : null }
      </div>
    </div>
  </div>
}

const Timeline = ({route, active, timeline}) => {
  return <div className={`body-block ${active} timeline`}>
    {timeline.map((day, index) => <Day {...day} route={route} key={day.name} last={timeline.length - 1 === index} />)}
  </div>
}
export default Timeline
