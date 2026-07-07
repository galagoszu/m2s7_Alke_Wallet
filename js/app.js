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




/* ==========================================================
   FUNCIONALIDAD DEL MENÚ PRINCIPAL

   En este bloque recuperamos la información guardada durante
   el Login para mostrarla en el menú principal.

   También inicializamos el saldo de la Wallet la primera vez
   que el usuario ingresa.
========================================================== */

if ($("#nombreUsuario").length) {

    // ==========================================
    // Recupero el correo almacenado en el Login.
    // Si no existe, redirijo al Login porque
    // significa que el usuario no inició sesión.
    // ==========================================

   const usuario = localStorage.getItem("usuario");
   if (!usuario) {
      window.location.href = "index.html";
   }


    // ==========================================
    // Muestro el correo en la pantalla.
    // ==========================================

   $("#nombreUsuario").text(usuario);


    // ==========================================
    // Si todavía no existe un saldo guardado,
    // creo uno inicial de $100.000
    // ==========================================

   if (localStorage.getItem("saldo") === null) {
      localStorage.setItem("saldo", 100000);
   }


    // ==========================================
    // Recupero el saldo y lo muestro.
    // ==========================================

   const saldo = parseFloat(localStorage.getItem("saldo"));
   $("#saldo").text(
      "$ " + saldo.toLocaleString("es-CL")
   );


    // ==========================================
    // Evento del botón Cerrar Sesión.
    //
    // Elimina únicamente el usuario guardado
    // para cerrar la sesión.
    //
    // El saldo se mantiene porque pertenece
    // a la Wallet.
    // ==========================================

   $("#btnCerrarSesion").click(function () {
      localStorage.removeItem("usuario");
      window.location.href = "index.html";
   });

}



/* ==========================================================
   FUNCIONALIDAD DE DEPÓSITOS

   Este bloque controla la pantalla deposit.html.

   Su objetivo es:

   1. Mostrar el saldo actual.
   2. Validar el monto ingresado.
   3. Actualizar el saldo.
   4. Guardar el movimiento.
   5. Volver al menú principal.
========================================================== */

if ($("#depositForm").length) {

    // ==========================================
    // Recupero el saldo almacenado.
    // ==========================================

   let saldo = parseFloat(localStorage.getItem("saldo")) || 100000;
   $("#saldoActual").text("$ " + saldo.toLocaleString("es-CL"));


    // ==========================================
    // Capturo el envío del formulario.
    // ==========================================
   
   $("#depositForm").submit(function (event) {
      event.preventDefault();

        // ==========================================
        // Obtengo el monto escrito por el usuario.
        // ==========================================

      const monto = parseFloat($("#montoDeposito").val());


        // ==========================================
        // Valido que sea un número mayor que cero.
        // ==========================================

      if (isNaN(monto) || monto <= 0) {

            $("#mensajeDeposito").html(`
               <div class="alert alert-danger">
                  Debe ingresar un monto válido.
               </div>
            `);

            return;

      }


        // ==========================================
        // Actualizo el saldo.
        // ==========================================

      saldo += monto;
      localStorage.setItem("saldo", saldo);


        // ==========================================
        // Recupero los movimientos guardados.
        // Si todavía no existen, creo un arreglo vacío.
        // ==========================================

      let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];


        // ==========================================
        // Registro el nuevo depósito.
        // ==========================================

      movimientos.unshift({
            tipo: "Depósito",
            monto: monto,
            fecha: new Date().toLocaleString("es-CL")
      });


        // ==========================================
        // Guardo nuevamente el arreglo.
        // ==========================================

      localStorage.setItem(
            "movimientos",
            JSON.stringify(movimientos)
      );


        // ==========================================
        // Muestro mensaje de éxito.
        // ==========================================

      $("#mensajeDeposito").html(`
            <div class="alert alert-success">
               Depósito realizado correctamente.
            </div>
      `);


        // ==========================================
        // Espero un segundo y regreso al menú.
        // ==========================================

      setTimeout(function () {
            window.location.href = "menu.html";
      }, 1000);
   });

}