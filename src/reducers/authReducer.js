import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const initialState = {
  checking: true,
  loading:false,
  user:{},
  error: null
}

const MySwal = withReactContent(Swal)

//const Login = createAction('auth/login')

export const startLogin = createAsyncThunk(
  'auth/login',
  async (values, { rejectWithValue}) => {
    const {lEmail: email, lPassword: password} = values
    try {
      const response = await fetchSinToken( 'auth/login', { email, password }, 'POST' );
      const body = await response.json();
      
      if (response.status === 201) {
        localStorage.setItem('token', body.token );
        localStorage.setItem('token-init-date', new Date().getTime() );
        return body
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Error!',
          text:body.msg ,
        })
        return rejectWithValue(body.msg);
      }
    } catch (error) {
       console.log('Error', error);
       rejectWithValue(error);
    }
  }
)


export const startRegister = createAsyncThunk(
  'auth/register',
  async (values, { rejectWithValue}) => {
    const {rName: name, rEmail: email, rPassword: password} = values
    const response = await fetchSinToken( 'auth/register', { name, email, password }, 'POST' );
    const body = await response.json();
    
    if (response.status === 201) {
      localStorage.setItem('token', body.token );
      localStorage.setItem('token-init-date', new Date().getTime() );

      return body
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Error!',
        text:body.msg ,
      })
      return rejectWithValue(body.msg);
    }
  }
)

export const startChecking = createAsyncThunk(
  'auth/ValidationToken',
  async (values, { rejectWithValue}) => {

    try {
      const response = await fetchConToken( 'auth/renew');
      const body = await response.json();

      localStorage.setItem('token', body.token );
      localStorage.setItem('token-init-date', new Date().getTime() );
      return(body);
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const eventStartUpdate = createAsyncThunk(
  'auth/ValidationToken',
  async (values, { rejectWithValue}) => {
    const response = await fetchConToken( 'auth/renew');
    const body = await response.json();

  
    if (response.status === 200) {
      localStorage.setItem('token', body.token );
      localStorage.setItem('token-init-date', new Date().getTime() );
      return body
    } else {
      return rejectWithValue (body);
   
    }
  }
)

export const authSlice = createSlice({
  name: 'autenticacion',
  initialState,
  reducers: {
    authLogin: (state, action) => {
      state.checking = false
    },
    authCheckingFinish: (state, action) => {
      state.checking = false
    },
    authLogout: (state, action) => {
      state.user = {};
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startLogin.pending, (state) => {
          state.loading = 'true'
        
      })
      .addCase(startLogin.fulfilled, (state, action) => {
        state.loading = false
        state.checking= false
        state.user = action.payload  
          
      })
      .addCase(startLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(startRegister.pending, (state) => {
     
          state.loading = 'true'
        
      })
      .addCase(startRegister.fulfilled, (state, action) => {
        state.loading = false
        state.checking= false
        state.user = action.payload  
          
      })
      .addCase(startRegister.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(startChecking.pending, (state) => {
          state.loading = 'true'
        
      })
      .addCase(startChecking.fulfilled, (state, action) => {
        state.loading = false
        state.checking= false
        state.user = action.payload  
          
      })
      .addCase(startChecking.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

// Action creators are generated for each case reducer function
export const {authLogin,authCheckingFinish, authLogout } = authSlice.actions

export default authSlice.reducer