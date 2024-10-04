import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export  const notify = (message) => {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top", // `top` or `bottom`
      position: 'center', // `left`, `center`, or `right`
      backgroundColor: "#4A90E2", // Tailwind color or custom color
      close: true, // Show close button
      stopOnFocus: true, // Prevents dismissing on hover
    }).showToast();
  };
