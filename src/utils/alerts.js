/**
 * IMPORT SWEET ALERT2
 */
import Swal from 'sweetalert2';

/**
 * EXPORT FUNCTION TO SHOW ALERT
 */
export function showAlert(title, icon, message, item){

    /**
     * SHOW MESSAGE
     */
    Swal.fire({
        title:          title,
        icon:           icon,  //warning - error - success - info - question
        text:           message,
        customClass:    {confirmButton:'btn btn-primary', popup:'animated zoomIn'},
    });
}

/**
 * EXPORT FUNCTION SHOW SUCCESS AUTHENTICATION
 */
export default function sessionShow() {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          // toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Bienvenido al Sistema"
      });
}