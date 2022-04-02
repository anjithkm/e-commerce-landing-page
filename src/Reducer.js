
 function Reducer (state, action){

    switch (action.type) {
      case 'increment':

            if(state.cart.includes(action.data)){
                return state;
            } else
            {
                
                return {...state,count:state.count +1,cart:[...state.cart,action.data]};
            }
              

      case 'decrement':
        
        if(state.count >= 0 ){
            return {...state,count: state.count - 1};
        } else
          return state;
        
      default:
        throw new Error();
    }
  }

export default Reducer;