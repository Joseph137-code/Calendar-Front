import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchConToken } from '../helpers/fetch';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)
const initialState = {
    events: [],
    activeEvent: null,
    loading:false,
    error: null
}

export const eventStartAddNew = createAsyncThunk(
    'event/new',
    async (event, {getState, rejectWithValue},  ) => {
        const { uid, name } = getState().auth.user;

        try {
            const response = await fetchConToken( 'events/', event,'POST' );
            const body = await response.json();
    
            if ( body.ok ) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }

                return( event );
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    
    }
)

export const eventStartLoading = createAsyncThunk(
    'event/get',
    async (event, {rejectWithValue},  ) => {
        try {
            const response = await fetchConToken( 'events');
            const body = await response.json();

            if (response.status === 200) {
                return (body.eventos)
            } else {
                return rejectWithValue (body);
            }
        } catch (error) {
            console.log('Error', error.response.data);
            rejectWithValue(error.response.data);
        }
    }
)

export const eventStartUpdate = createAsyncThunk(
    'event/update',
    async (event, {rejectWithValue},  ) => {
       const response = await fetchConToken(`events/${ event.id }`, event, 'PUT');
        const body = await response.json();
        

       if (response.status === 200) {
            return (event)
          } else {
            MySwal.fire({
                icon: 'error',
                title: 'Error!',
                text:body.msg ,
            })
            return rejectWithValue (body);
         
        }
    }
)

export const eventStartDelete = createAsyncThunk(
    'event/Delete',
    async (event, {getState, rejectWithValue},  ) => {
        const { id } = getState().calendario.activeEvent;
       const response = await fetchConToken(`events/${id }`,{}, 'DELETE' );
        const body = await response.json();
      if (response.status === 200) {
            return (body)
          } else {
            MySwal.fire({
                icon: 'error',
                title: 'Error!',
                text:body.msg ,
            })
            return rejectWithValue (body);
         
        }
    }
)

export const calendarSlice = createSlice({
  name: 'calendario',
  initialState,
  reducers: {
    eventSetActive: (state, action) => {
        state.activeEvent = action.payload
    },
    eventAddNew: (state, action) => {
        state.events = [ 
            ...state.events,
            action.payload]
    },
    eventClearActiveEvent: (state) => {
        state.activeEvent = null
    },
    eventUpdated: (state, action) => {
        state.events = state.events.map(
            e => ( e.id === action.payload.id ) ? action.payload : e
        )
    },
    eventDeleted: (state) => {
        state.events = state.events.filter(
            e => ( e.id !== state.activeEvent.id )
        )
        state.activeEvent = null
    },
    eventLoaded: (state, action) => {
        state.events = [ action.payload]
    },
    eventLogout: () => {
        return {
            ...initialState
        }
    },

  },
  extraReducers: (builder) => {
    builder
    .addCase(eventStartLoading.pending, (state, action) => {
        state.loading = true
    })
    .addCase(eventStartLoading.fulfilled, (state, action) => {
        state.events = action.payload
    })
    .addCase(eventStartLoading.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase(eventStartUpdate.pending, (state, action) => {
        state.loading = true
    })
    .addCase(eventStartUpdate.fulfilled, (state, action) => {
        state.events = state.events.map(
            e => ( e.id === action.payload.id ) ? action.payload : e
        )
    })
    .addCase(eventStartUpdate.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase(eventStartAddNew.pending, (state, action) => {
        state.loading = true
    })
    .addCase(eventStartAddNew.fulfilled, (state, action) => {
        state.loading = false
        state.events = [...state.events, action.payload]
    })
    .addCase(eventStartAddNew.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase(eventStartDelete.pending, (state, action) => {
        state.loading = true
    })
    .addCase(eventStartDelete.fulfilled, (state, action) => {
        state.loading = false
        state.events = state.events.filter(
            e => ( e.id !== state.activeEvent.id )
        )
        state.activeEvent = null
    })
    .addCase(eventStartDelete.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
      
  },
})

// Action creators are generated for each case reducer function
export const {eventSetActive,eventAddNew, eventClearActiveEvent, eventUpdated,
    eventDeleted ,eventLoaded, eventLogout
} = calendarSlice.actions

export default calendarSlice.reducer