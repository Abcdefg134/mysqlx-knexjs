import{createStore} from 'vuex'
const store = createStore({
    state(){
        return{
            token:{}
        }
    },
    mutations:{
        GET_TOKEN(state,token){
            state.token = token
        }
    },
    getters:{
        getToken:(state)=>{
            return state.token
        }
    }
})

export default store