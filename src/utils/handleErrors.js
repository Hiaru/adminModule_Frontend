/**
 * IMPORTS
 */
import { useAuthStore } from '@/store/auth';
import { showAlert } from '@/utils/alerts';

/**
 * FUNCTION TO HANDLE ERRORS MESSAGE
 */
export async function handleError(status, title = ''){

    /**
     * INTIALIZE AUTH STORE
     */
    const authStore = useAuthStore();

    /**
     * HANDLE BY ERROR STATUS
     */
    switch (status) {
        case 400:   //BAD REQUEST
            showAlert('Error', 'error', (title != '') ? title : 'Datos Incorrectos');
        break;
        case 401:   //UNAUTHORIZED
            /**
             * VERIFY IF USER IS LOGED IN
             */
            if(authStore.authToken){
                showAlert('Error', 'error', (title != '') ? title : 'Usuario no autenticado');

                /**
                 * WIPE SESSION AND REDIRECT TO LOGIN
                 */
                authStore.authToken = null;
                authStore.authUser = null;

                setTimeout(() => {
                    location.assign('/login');
                }, "5000");
            }

        break;
        case 403:   //FORBIDDEN
            showAlert('Error', 'error', (title != '') ? title : 'Acceso no autorizado');

            /**
             * REDIRECT TO DASHBOARD
             */
            location.assign('/');
        break;
        case 422:   //UNPROCESSABLE ENTITY
            showAlert('Error', 'error', (title != '') ? title : 'Exísten errores en la solicitud');
        break;
        case 423:   //LOCKED
            showAlert('Error', 'error', (title != '') ? title : 'Recurso deshabilitado, contáctese con el administrador.');
        break;
    }
}