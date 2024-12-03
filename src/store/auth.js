/**
 * IMPORT DEFINE STORE FUNCTION FROM PINIA
 */
import { defineStore } from 'pinia';

/**
 * IMPORT FUNCTION TO HANDLE ERRORS
 */
import { handleError } from '@/utils/handleErrors';

/**
 * IMPORT FUNCTION TO SHOW MESSAGES
 */
import sessionShow from '@/utils/alerts';

/**
 * FUNCTION TO AUTHENTICATE USERS USING LOCAL STORAGE WITH PINIA
 */
export const useAuthStore = defineStore('auth', {
    /**
     * VALUES TO USE IN AUTH STORE
     */
    state: () => ({ 
        authUser: null, 
        authToken: null
    }),

    /**
     * GETTER METHODS FOR GET DATA ABOUT USER
     */
    getters: {
        isAuthenticated     : (state) => (state.authUser!== null && state.authToken!== null),
        user                : (state) => state.authUser,
        token               : (state) => state.authToken
    },
    /**
     * FUNCTIONS TO USE IN AUTH STORE
     */
    actions: {
        async getToken(){
            /**
             * GET TOKEN FOR SANCTUM CSRF-COOKIE (CROSS-SITE REQUEST FORGERY) 
             * AUTH MIDDLEWARE AND PUT IT INTO THE BROWSER
             */
            await axios.get('/sanctum/csrf-cookie')
        },
        async login(user){
            /**
             *GET CSRF-COOKIE (CROSS-SITE REQUEST FORGERY)
             */
            this.getToken();

            /**
             * SEND DATA TO BACKEND
             */
            return await axios.post('/api/login', user)
            /**
             * IF RESPONSE SUCCESSFUL
             */
            .then((response) => {
                /**
                 * PUT THE OBTAINED DATA IN STORE
                 */
                this.authToken = response.data.token;
                this.authUser = response.data.data.username;
                
                console.log('user: ');
                /**
                 * REDIRECT TO DASHBOARD VIEW
                 */
                this.router.push('/');

                /**
                 * SHOW ALERT ABOUT USER AUTHENTICATION SUCCESSFUL
                 */
                sessionShow();
            })
            /**
             * CATCH ERRORS
             */
            .catch((errors) => {
                /**
                 * CALLHANDLE ERROR FUNCTION
                 */
                handleError(errors.response.status, errors.response.data.errorTitle);

                // return errors.response.data;
            })
        },
        async logout(){
            /**
             * SEND DATA TO BACKEND
             */
            await axios.get('/api/auth/logout', {
                headers: {
                    /**
                     * PUT CSRF-TOKEN IN HEADERS
                     */
                    'Authorization': `Bearer ${this.authToken}`,
                }
            })
            /**
             * CLOSE SESSION USER IN FRONTEND FLUSHING VARIABLES
             */
            .then((response) => {
                this.authToken = null;
                this.authUser = null;

                /**
                 * REDIRECT TO LOGIN PAGE
                 */
                this.router.push('/login');
            })
            /**
             * CATCH ERRORS
             */
            .catch((errors) => {
                /**
                 * CALL HANDLE ERROR FUNCTION
                 */

                return errors.response.data;
            })
        },
    },
    /**
     * USE PLUGIN TO PERSIST THE DATA IN ALL THE PROJECT
     */
    persist:true  //Keeps info active about user's session
})