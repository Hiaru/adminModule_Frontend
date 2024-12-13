/**
 * IMPORT AXIOS
 */
import axios from 'axios'

/**
 * IMPORT AUTH STORE
 */
import { useAuthStore } from '@/store/auth'

/**
 * IMPORT HANDLE ERROR
 */
import { handleError } from '@/utils/handleErrors'

/**
<<<<<<< HEAD
=======
 * TESTING
 */
// export async function sendPOSTRequest(parameters) {
//     const authStore = useAuthStore()

//     /**
//      * PUTH BEARER TOKEN FOR AUTHORIZATION CSRF TOKEN
//      */
//     axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`

//     /**
//      * SEND DATA TO BACKEND
//      */
//     return await axios.post('api/new', {
//             // data: parameters,
//             headers: {
//                 'Authorization': `Bearer ${authStore.authToken}`
//             }
//         }
//     )
//     /**
//      * IF RESPONSE SUCCESSFUL
//      */
//     .then((response) => {
//         console.log('response: ', response)
//     })
//     /**
//      * CATCH ERRORS
//      */
//     .catch((errors) => {
//         /**
//          * CALLHANDLE ERROR FUNCTION
//          */
//         handleError(errors.response.status, errors.response.data.errorTitle);

//         // return errors.response.data;
//     })
// }

/**
>>>>>>> dcb856fdf61a41ecc70656bab0c5800eb206413c
 * FUNCTION FOR SEND DATA TO BACKEND
 */
export async function sendRequest(method, url, parameters, redirect = ''){
    /**
     * ONLY SEND DATA IF USER IS AUTHENTICATED
     */
    const authStore = useAuthStore()

    if(authStore.isAuthenticated){
        console.log('method: ', method);
        console.log('url: ', url);
        console.log('parameters: ', parameters);
        /**
         * PUTH BEARER TOKEN FOR AUTHORIZATION CSRF TOKEN
         */
        axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;

        /**
         * SEND DATA TO BACKEND
         */
        return await axios({
            /**
             * CONFIG PARAMETERS FOR REQUEST
             */
            method: method,
            url: url,
<<<<<<< HEAD
            data: parameters,
=======
            // data: parameters,
>>>>>>> dcb856fdf61a41ecc70656bab0c5800eb206413c
            headers: {
                'Authorization': `Bearer ${authStore.authToken}`
            }
        })
        .then((response) => {
            console.log('response: ', response);
            /**
             * RETURN DATA
             */
            return response.data;
        })
        .catch((error) => {
            /**
             * HANDLE ERROR
             */
            handleError(error.response.status, error.response.data.errorTitle);
        })
    }
}