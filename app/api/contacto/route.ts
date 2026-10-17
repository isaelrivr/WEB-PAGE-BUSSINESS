import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { nombre, correo, telefono, negocio, servicio, mensaje, _gotcha } = body;

    // Protección básica contra spam (campo oculto / honeypot)
    if (_gotcha && _gotcha.trim() !== "") {
      // Si el bot llenó el campo oculto, respondemos éxito sin procesar
      return NextResponse.json(
        { success: true, message: "Mensaje procesado correctamente." },
        { status: 200 }
      );
    }

    // Validación en el servidor
    const errors: Record<string, string> = {};

    if (!nombre || typeof nombre !== "string" || nombre.trim().length < 2) {
      errors.nombre = "Por favor ingresa un nombre válido (mínimo 2 caracteres).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || typeof correo !== "string" || !emailRegex.test(correo.trim())) {
      errors.correo = "Ingresa un correo electrónico válido.";
    }

    if (!negocio || typeof negocio !== "string" || negocio.trim().length < 2) {
      errors.negocio = "Indica el nombre de tu negocio o proyecto.";
    }

    const validServices = [
      "Reseñas con NFC y QR",
      "Perfil de Google Business",
      "Página web",
      "Redes sociales",
      "Otro",
    ];

    if (!servicio || !validServices.includes(servicio)) {
      errors.servicio = "Selecciona un servicio válido de la lista.";
    }

    if (!mensaje || typeof mensaje !== "string" || mensaje.trim().length < 10) {
      errors.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    }

    if (telefono && typeof telefono === "string" && telefono.trim().length > 25) {
      errors.telefono = "El número telefónico no debe exceder 25 caracteres.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors,
          message: "Por favor revisa los campos señalados.",
        },
        { status: 400 }
      );
    }

    // Registro en consola de los datos validados
    console.log("=== [NUEVO MENSAJE DE CONTACTO RECIBIDO] ===");
    console.log({
      nombre: nombre.trim(),
      correo: correo.trim(),
      telefono: telefono ? telefono.trim() : "No especificado",
      negocio: negocio.trim(),
      servicio,
      mensaje: mensaje.trim(),
      recibidoEl: new Date().toISOString(),
    });
    console.log("============================================");

    // =========================================================================
    // CONEXIÓN DE SERVICIO DE CORREO:
    // Aquí se conectará el servicio de correo (por ejemplo Resend, SendGrid o
    // Nodemailer) utilizando variables de entorno de .env.local:
    //
    // Ejemplo con Resend:
    // const resendApiKey = process.env.RESEND_API_KEY;
    // await resend.emails.send({
    //   from: "Agencia PyME <notificaciones@tu-dominio.com>",
    //   to: [process.env.CONTACT_RECEIVER_EMAIL || "contacto@agenciapyme.mx"],
    //   subject: `Nuevo contacto: ${negocio} (${servicio})`,
    //   text: `Nombre: ${nombre}\nCorreo: ${correo}\nTeléfono: ${telefono}\nMensaje:\n${mensaje}`,
    // });
    // =========================================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "¡Gracias por contactarnos! Hemos recibido tu información y nos comunicaremos contigo a la brevedad.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al procesar formulario de contacto:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ocurrió un error inesperado. Por favor intenta de nuevo.",
      },
      { status: 500 }
    );
  }
}
