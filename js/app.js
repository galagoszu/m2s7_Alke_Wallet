/* ==========================================================
   ALKE WALLET
   Archivo JavaScript principal

   En este archivo se programa toda la funcionalidad
   del proyecto.

   En este primer Sprint desarrollaremos únicamente
   el Login.
========================================================== */


/* ==========================================================
   CREDENCIALES DE PRUEBA

   Se guardan en constantes para que si el profesor
   quiere cambiar el correo o la contraseña solamente
   debamos modificar estas líneas.
========================================================== */

const correoPrueba = "bootcamp@gmail.com";

const passwordPrueba = "java2026";


/* ==========================================================
   Esperamos que toda la página termine de cargar.

   $(document).ready() es una función de JQuery que
   evita que el programa intente buscar elementos HTML
   antes de que existan.
========================================================== */

$(document).ready(function () {

    /* ======================================================
       Si existe el formulario Login significa que estamos
       en index.html.

       En las demás páginas este bloque simplemente no se
       ejecutará.
    ====================================================== */

    if ($("#loginForm").length) {

        /* ==============================================
           Capturamos el envío del formulario.
        ============================================== */

        $("#loginForm").submit(function (event) {

            /* ==========================================
               Evita que el formulario recargue la página.
            ========================================== */

            event.preventDefault();


            /* ==========================================
               Recuperamos lo que escribió el usuario.
            ========================================== */

            const correo = $("#correo").val().trim();

            const password = $("#password").val().trim();


            /* ==========================================
               Comparamos los datos ingresados con las
               credenciales de prueba.
            ========================================== */

            if (correo === correoPrueba &&
                password === passwordPrueba) {

                /* ======================================
                   Guardamos el usuario en localStorage.

                   Más adelante el menú principal podrá
                   recuperar este dato para mostrar
                   un saludo personalizado.
                ====================================== */

                localStorage.setItem("usuario", correo);

                /* ======================================
                   Mostramos mensaje de éxito utilizando
                   Bootstrap.
                ====================================== */

                $("#mensaje").html(

                    `<div class="alert alert-success">

                        Inicio de sesión correcto.

                        Redirigiendo al menú...

                    </div>`

                );

                /* ======================================
                   Esperamos 1 segundo antes de cambiar
                   de página.
                ====================================== */

                setTimeout(function () {

                    window.location.href = "menu.html";

                }, 1000);

            }

            else {

                /* ======================================
                   Si las credenciales no coinciden
                   mostramos un mensaje de error.
                ====================================== */

                $("#mensaje").html(

                    `<div class="alert alert-danger">

                        Correo o contraseña incorrectos.

                    </div>`

                );

            }

        });

    }

});