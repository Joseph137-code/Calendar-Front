import React, {useState, useEffect}  from 'react'
import Modal              from 'react-modal';
import DateTimePicker     from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector, useDispatch } from 'react-redux'
import { modalClose } from '../../reducers/pruebaReducer'
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate  } from '../../reducers/calendarReducer';

const MySwal = withReactContent(Swal)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
  title:'',
  notes:'',
  start: now.toDate(),
  end: nowPlus1.toDate()
}

const CalendarModal = () => {
  
  const modalIsOpen = useSelector((state) => state.counter.modalOpen)
  const {activeEvent} = useSelector((state) => state.calendario)
 
  const dispatch = useDispatch()
  //const [modalIsOpen, setIsOpen] = useState(false);

  
  const [ dateStart, setDateStart ] = useState( now.toDate() );
  const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );
  const [ titleValid, setTitleValid ] = useState(true);
  const [formValues, setFormValues] = useState(initEvent);

  const {title, notes, start, end} = formValues;

  useEffect(() => {
    if ( activeEvent ) {
        setFormValues( activeEvent );
    } else {
        setFormValues( initEvent );
    }
  }, [activeEvent, setFormValues])


  const handleInputChange = ({ target }) => {
    setFormValues({
        ...formValues,
        [target.name]: target.value
    });
  }


  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    dispatch(modalClose())
    dispatch(eventClearActiveEvent())
    setFormValues(initEvent)

  }

  const handleStartDateChange = ( e ) => {
    setDateStart( e );
    setFormValues({
      ...formValues,
      start: e
    })
  }

  const handleEndDateChange = ( e ) => {
    setDateEnd( e );
    setFormValues({
        ...formValues,
        end: e
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment( start );
    const momentEnd = moment( end );

    if ( momentStart.isSameOrAfter( momentEnd ) ) {
      return MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error!',
        footer: 'La fecha fin debe de ser mayor a la fecha de inicio'
      })
    }

    if ( title.trim().length < 2 ) {
      return setTitleValid(false);
    }
    
    if ( activeEvent ) {
      dispatch( eventStartUpdate( formValues ) )
    } else {
      dispatch(eventStartAddNew(formValues))
    }


      

      setTitleValid(true)
      closeModal()

  }

  return (
    <div>
      
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-fondo"
      >
        <h1>{( activeEvent ) ?'Edita el Evento': 'Nuevo Evento' } </h1>
        <hr />
        <form 
          onSubmit={handleSubmitForm}
          className="container"
        >

          <div className="form-group">
            <label>Fecha y hora inicio</label>
            <DateTimePicker
              onChange={handleStartDateChange}
              value={dateStart}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora fin</label>
            <DateTimePicker
              onChange={handleEndDateChange}
              value={dateEnd}
              minDate={dateStart}
              className="form-control"
            />
          </div>

          <hr />
          <div className="form-group">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={ `form-control ${ !titleValid && 'is-invalid' } `}
              placeholder="Título del evento"
              name="title"
              value={title}
              onChange={ handleInputChange }
              autoComplete="off"
            />
            <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={notes}
              onChange={ handleInputChange }
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">Información adicional</small>
          </div>

          <button
            type="submit"
            className="btn btn-outline-primary btn-block"
          >
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default CalendarModal
