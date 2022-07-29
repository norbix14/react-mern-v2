/**
 * Show a basic modal alert.
 *
 * @param {object} params - object.
 * @param {string} params.title - title of the modal.
 * @param {string} params.text - text for the modal.
 * @param {string} params.icon - icon of the modal.
 * @param {string} params.confirmButtonText - text for the confirmation button text.
 *
 * @example
 * SweetAlert.Swal({})
 * // shows a basic alert
 *
 */
const Swal = ({
  title = 'Correct',
  text = 'Correct',
  icon = 'success',
  confirmButtonText = 'Ok',
}) => {
  return window.Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
  })
}

/**
 * Show a basic modal alert.
 *
 * @param {object} params - object.
 * @param {string} params.position - position of the modal.
 * @param {string} params.timer - timer or duration for the modal.
 * @param {string} params.icon - icon of the modal.
 * @param {string} params.title - title of the modal.
 *
 * @example
 * SweetAlert.Toast({})
 * // shows a basic alert
 *
 */
const Toast = ({
  position = 'top-end',
  timer = 3000,
  icon = 'success',
  title = 'Correct',
}) => {
  const toast = window.Swal.mixin({
    toast: true,
    position,
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', window.Swal.stopTimer)
      toast.addEventListener('mouseleave', window.Swal.resumeTimer)
    },
  })
  return toast.fire({
    icon,
    title,
  })
}

/**
 * Show a basic modal alert.
 *
 * @param {object} params - object.
 * @param {string} params.title - title of the modal.
 * @param {string} params.denyButtonText - text for the deny button text.
 * @param {string} params.confirmButtonText - text for the confirmation button text.
 *
 * @example
 * SweetAlert.Delete({})
 * // shows a confirmation prompt
 *
 * @returns {Promise} a promise with the result of the user action.
 */
const Delete = ({
  title = '¿Are you sure?',
  denyButtonText = 'Cancel',
  confirmButtonText = 'Delete',
}) => {
  return window.Swal.fire({
    title,
    showDenyButton: true,
    denyButtonText,
    confirmButtonText,
  })
}

/**
 * Show a modal for the expired session.
 *
 * @param {object} params - object.
 * @param {string} params.title - title of the modal.
 * @param {string} params.text - text for the modal.
 *
 * @example
 * SweetAlert.Expire({})
 * // shows an expiration modal
 *
 * @returns {Promise} a promise with the result of the user action.
 *
 */
const Expire = ({ title = 'Expired', text = 'Expired' }) => {
  return window.Swal.fire({
    title,
    text,
    icon: 'warning',
    allowEscapeKey: false,
    showConfirmButton: false,
    willClose: () => {},
  })
}

/**
 * Show a basic loader.
 *
 * @param {object} params - object.
 * @param {string} params.title - title of the loader.
 *
 * @example
 * SweetAlert.Loader({})
 * // shows a modal with a loader
 *
 * @returns {Promise} a promise showing the loader.
 */
const Loader = ({ title = 'Processing...' }) => {
  // TODO: implement loader
  return window.Swal.fire({
    title,
    showConfirmButton: false,
    //allowOutsideClick: false,
    //allowEscapeKey: false,
    didOpen: () => {
      window.Swal.showLoading()
    },
    willClose: () => {},
  })
}

export default {
  Delete,
  Expire,
  Loader,
  Swal,
  Toast,
}
