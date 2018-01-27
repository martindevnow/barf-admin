import * as actions from './actionTypes';
import * as mutations from './mutationTypes';
import http from '../../../http';

export default {
  [actions.FETCH_ALL] ({commit, state}, force = false) {
      return new Promise((resolve, reject) => {
          if (! force && state.collection.length)
              return resolve(state.collection);

          http.get('/admin/api/couriers')
              .then(response => {
                  commit(mutations.POPULATE_COLLECTION, response.data);
                  resolve(response);
              })
              .catch(error => {
                  console.log(error);
                  reject(error);
              });
      });
  },
};

