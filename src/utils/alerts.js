/**
 * IMPORT SWEET ALERT2
 */
import Swal from 'sweetalert2';

/**
 * EXPORT FUNCTION TO SHOW ALERT
 */
<<<<<<< HEAD
export function showAlert(title, icon, message, item = ''){
=======
export function showAlert(title, icon, message, item){
>>>>>>> dcb856fdf61a41ecc70656bab0c5800eb206413c

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
<<<<<<< HEAD
}

/**
 * EXPORT FUNCTION GET CONFIRMATION BY USER
 */
export async function showConfirmation(title, icon, message, item = ''){
  const alert = Swal.mixin({buttonsStyling: true})

  const result = await alert.fire({
    title: title,
    text: message,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Aceptar'
  })

  return (result.isConfirmed) ? true : false;
=======
>>>>>>> dcb856fdf61a41ecc70656bab0c5800eb206413c
}