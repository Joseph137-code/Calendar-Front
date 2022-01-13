import React, {useState, useEffect}   from 'react'
import { Calendar, momentLocalizer }  from 'react-big-calendar'
import { messages }                   from '../../helpers/calendarEsp';
import CalendarEvent                  from './CalendarEvent';
import CalendarModal                  from './CalendarModal';
import moment                         from 'moment'
import Navbar                         from '../ui/Navbar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

import { useSelector, useDispatch } from 'react-redux'
import { modalOpening} from '../../reducers/pruebaReducer'

import { eventSetActive, eventClearActiveEvent, eventStartLoading} from '../../reducers/calendarReducer'
import { AddNewFab } from '../ui/AddNew';
import { DeleteEventFab } from '../ui/DeleteNew';


moment.locale('es');

const localizer = momentLocalizer(moment)

const CalendarPage = () => {

  const dispatch = useDispatch()
  const eventos = useSelector((state) => state.calendario.events)
  const {activeEvent} = useSelector((state) => state.calendario)
  const {uid} = useSelector((state) => state.auth.user)

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

  useEffect(() => {
        
    dispatch( eventStartLoading() );

  }, [ dispatch ])

  const onDoubleClick = (e) => {
    dispatch( modalOpening() );
  }

  const onSelectEvent = (e) => {
    dispatch( eventSetActive(e))
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = (e) => {
    dispatch( eventClearActiveEvent() );
  }



  const eventStyleGetter = ( event, start, end, isSelected ) => {
    const style = {
      backgroundColor:( uid === event.user._id ) ? '#e61c5f': '#367CF7',
      borderRadius: '0px',
      display: 'block',
      color: '#333132'
    }
    return {
        style
    }
  };


    return (
      <div className="calendar-screen">
        <Navbar/>
          <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            onDoubleClickEvent={ onDoubleClick }
            onSelectEvent={ onSelectEvent }
            onView={ onViewChange }
            onSelectSlot={ onSelectSlot }
            selectable={ true }
            messages={messages}
            view={ lastView }
            eventPropGetter={ eventStyleGetter }
            components={{
              event: CalendarEvent
            }}
            
          />

          <AddNewFab />
          
          {
            (activeEvent) && <DeleteEventFab/>
          }
          <CalendarModal/>
      </div>
    )
}

export default CalendarPage
