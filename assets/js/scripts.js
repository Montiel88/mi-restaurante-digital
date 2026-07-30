let html5QrCode = null;

$(document).ready(function() {
    let carrito = [];

    $(document).on('click', '.agregar-carrito', function() {
        const id = $(this).data('id');
        const nombre = $(this).data('nombre');
        const precio = $(this).data('precio');
        const existe = carrito.find(item => item.id === id);
        if (existe) existe.cantidad += 1;
        else carrito.push({ id, nombre, precio, cantidad: 1 });
        actualizarCarrito();
        $(this).html('<i class="fas fa-check"></i>');
        setTimeout(() => { $(this).html('<i class="fas fa-cart-plus"></i>'); }, 800);
    });

    function actualizarCarrito() {
        const lista = $('#carrito-lista');
        const totalSpan = $('#carrito-total');
        const countSpan = $('#carrito-count');
        const btnFinalizar = $('#btn-finalizar-pedido');
        if (carrito.length === 0) {
            lista.html('<p class="text-muted text-center">Tu carrito está vacío.</p>');
            totalSpan.text('$ 0.00');
            countSpan.text('0');
            btnFinalizar.prop('disabled', true);
            return;
        }
        let html = '', total = 0;
        carrito.forEach((item, index) => {
            const sub = item.precio * item.cantidad;
            total += sub;
            html += `<div class="item-carrito">
                <div><strong>${item.nombre}</strong><br><span style="color: #FFD700; font-weight: bold;">$ ${item.precio.toFixed(2)}</span></div>
                <div class="cantidad-control">
                    <button class="btn-cantidad" data-index="${index}" data-accion="restar">-</button>
                    <span class="fw-bold mx-2">${item.cantidad}</span>
                    <button class="btn-cantidad" data-index="${index}" data-accion="sumar">+</button>
                    <button class="btn btn-sm btn-outline-danger ms-2 btn-eliminar" data-index="${index}"><i class="fas fa-trash"></i></button>
                </div>
            </div>`;
        });
        lista.html(html);
        totalSpan.text('$ ' + total.toFixed(2));
        countSpan.text(carrito.reduce((acc, i) => acc + i.cantidad, 0));
        btnFinalizar.prop('disabled', false);
    }

    $(document).on('click', '.btn-cantidad', function() {
        const index = $(this).data('index');
        const accion = $(this).data('accion');
        if (accion === 'sumar') carrito[index].cantidad += 1;
        else {
            carrito[index].cantidad -= 1;
            if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
        }
        actualizarCarrito();
    });

    $(document).on('click', '.btn-eliminar', function() {
        const index = $(this).data('index');
        carrito.splice(index, 1);
        actualizarCarrito();
    });

    $('#btn-finalizar-pedido').click(function() {
        if (carrito.length === 0) return;
        detenerScanner();
        let resumen = '', total = 0;
        carrito.forEach(item => {
            const sub = item.precio * item.cantidad;
            total += sub;
            resumen += `${item.cantidad}x ${item.nombre} - $ ${sub.toFixed(2)}\n`;
        });
        resumen += `\nTOTAL: $ ${total.toFixed(2)}`;
        const modalBody = $('#modal-pago-body');
        modalBody.html(`
            <h6 style="color: #FFD700; font-weight: bold; font-size: 1.1rem; margin-bottom: 15px;">Resumen de tu pedido:</h6>
            <div style="background: linear-gradient(135deg, #2a2a2a, #1a1a1a); border-left: 4px solid #FFD700; padding: 15px; border-radius: 10px; font-family: monospace; font-size: 0.95rem; line-height: 1.8; white-space: pre-wrap; color: #FFD700; font-weight: 600; text-shadow: 0 0 5px rgba(255, 215, 0, 0.3);">${resumen}</div>
            <hr style="border-color: rgba(255, 152, 0, 0.3); margin: 20px 0;">
            <h6 style="color: #FFD700; font-weight: bold; font-size: 1.1rem; margin-bottom: 15px;">Datos para tu pedido a domicilio:</h6>
            <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 193, 7, 0.25); border-radius: 14px; padding: 15px; margin-bottom: 20px;">
                <div class="row g-2">
                    <div class="col-12 col-md-6">
                        <label class="form-label" style="color:#e0e0e0; font-weight:600; font-size:0.9rem;">Nombre (opcional)</label>
                        <input type="text" id="cliente-nombre" class="form-control" placeholder="Tu nombre" style="background:#1f1f1f; color:#fff; border:1px solid rgba(255,193,7,0.25);">
                    </div>
                    <div class="col-12 col-md-6">
                        <label class="form-label" style="color:#e0e0e0; font-weight:600; font-size:0.9rem;">Teléfono (opcional)</label>
                        <input type="tel" id="cliente-telefono" class="form-control" placeholder="Tu número" style="background:#1f1f1f; color:#fff; border:1px solid rgba(255,193,7,0.25);">
                    </div>
                    <div class="col-12">
                        <label class="form-label" style="color:#e0e0e0; font-weight:600; font-size:0.9rem;">Dirección / Referencia (recomendado)</label>
                        <input type="text" id="cliente-direccion" class="form-control" placeholder="Sector, calle, número, referencia, etc." style="background:#1f1f1f; color:#fff; border:1px solid rgba(255,193,7,0.25);">
                    </div>
                    <div class="col-12">
                        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="cliente-compartir-ubicacion">
                                <label class="form-check-label" for="cliente-compartir-ubicacion" style="color:#e0e0e0; font-size:0.9rem;">Adjuntar mi ubicación (GPS)</label>
                            </div>
                            <button type="button" class="btn btn-outline-info btn-sm" id="btn-obtener-ubicacion" style="border-radius:50px;">Obtener ubicación</button>
                        </div>
                        <div id="cliente-ubicacion-info" style="margin-top:10px; font-size:0.85rem; color:#9ecbff; display:none;"></div>
                        <input type="hidden" id="cliente-ubicacion-link" value="">
                    </div>
                </div>
            </div>
            <hr style="border-color: rgba(255, 152, 0, 0.3); margin: 20px 0;">
            <h6 style="color: #FFD700; font-weight: bold; font-size: 1.1rem; margin-bottom: 15px;">Selecciona método de pago:</h6>
            <div class="d-flex gap-3 mb-3">
                <button class="btn btn-outline-primary w-50 p-3 metodo-pago" data-metodo="efectivo" style="border-color: #FFC107; color: #FFC107;">
                    <i class="fas fa-money-bill fa-2x d-block mb-2"></i> <strong>Efectivo</strong>
                </button>
                <button class="btn btn-outline-success w-50 p-3 metodo-pago" data-metodo="transferencia" style="border-color: #28a745; color: #28a745;">
                    <i class="fas fa-university fa-2x d-block mb-2"></i> <strong>Transferencia</strong>
                </button>
            </div>
            <div id="detalle-pago" class="mt-3"></div>
        `);
        $('#pagoModal').modal('show');
    });

    $(document).on('click', '#btn-obtener-ubicacion', function() {
        const info = $('#cliente-ubicacion-info');
        info.show().text('Obteniendo ubicación...');
        if (!navigator.geolocation) {
            info.text('Tu navegador no permite obtener ubicación.');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                const link = `https://maps.google.com/?q=${lat},${lng}`;
                $('#cliente-ubicacion-link').val(link);
                $('#cliente-compartir-ubicacion').prop('checked', true);
                info.html(`Ubicación lista: <a href="${link}" target="_blank" style="color:#9ecbff;">Ver en Google Maps</a>`);
            },
            () => {
                info.text('No se pudo obtener la ubicación. Puedes escribir tu dirección.');
            },
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
        );
    });

    $('#pagoModal').on('hidden.bs.modal', function () {
        detenerScanner();
    });

    $(document).on('click', '.metodo-pago', function() {
        const metodo = $(this).data('metodo');
        const detalleDiv = $('#detalle-pago');
        detenerScanner();
        if (metodo === 'efectivo') {
            detalleDiv.html(`
                <div class="alert alert-info" style="background: rgba(23, 162, 184, 0.15); border-color: rgba(23, 162, 184, 0.5); color: #fff;"><i class="fas fa-info-circle"></i> Pagas en efectivo al recibir tu pedido.</div>
                <button class="btn btn-success w-100" id="confirmar-pedido-efectivo" style="background: linear-gradient(135deg, #28a745, #1e7e34); border: none; padding: 15px; font-size: 1.05rem; font-weight: bold;"><i class="fab fa-whatsapp"></i> Confirmar Pedido (Efectivo)</button>
            `);
        } else {
            detalleDiv.html(`
                <div style="background: linear-gradient(145deg, rgba(45, 45, 45, 0.95), rgba(25, 25, 25, 0.98)); border: 2px solid rgba(255, 193, 7, 0.4); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                    <h6 style="color: #FFD700; font-weight: bold; font-size: 1.1rem; margin-bottom: 15px;">📋 Datos para Transferencia:</h6>
                    <p style="margin-bottom: 10px; color: #fff;"><strong style="color: #FFD700;">🏦 Banco:</strong> ${BANCO_NOMBRE}</p>
                    <p style="margin-bottom: 10px; color: #fff;"><strong style="color: #FFD700;">💳 Tipo:</strong> ${BANCO_TIPO_CUENTA}</p>
                    <p style="margin-bottom: 10px; color: #fff;"><strong style="color: #FFD700;">🔢 N° Cuenta:</strong> ${BANCO_NUMERO}</p>
                    <p style="margin-bottom: 10px; color: #fff;"><strong style="color: #FFD700;">👤 Titular:</strong> ${BANCO_TITULAR}</p>
                    <p style="margin-bottom: 15px; color: #fff;"><strong style="color: #FFD700;">🆔 Cédula:</strong> ${BANCO_CEDULA}</p>
                    <div class="text-center mt-3" style="padding: 15px; background: rgba(255, 255, 255, 0.95); border-radius: 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
                        <img src="${BANCO_QR_IMG}?v=${Date.now()}" alt="QR Banco" style="max-width: 280px; width: 100%; border-radius: 8px;">
                        <p style="margin-top: 10px; color: #1a1a1a; font-weight: 700; font-size: 0.95rem;">📱 Escanea el QR para transferir.</p>
                    </div>
                    <button class="btn-escanear-qr" id="btn-iniciar-scanner">
                        <i class="fas fa-qrcode"></i> 📷 Escanear Código QR
                    </button>
                    <div id="scanner-wrapper" style="display: none; margin-top: 15px;"></div>
                </div>
                <button class="btn btn-success w-100" id="confirmar-pedido-transferencia" style="background: linear-gradient(135deg, #28a745, #1e7e34); border: none; padding: 15px; font-size: 1.05rem; font-weight: bold;"><i class="fab fa-whatsapp"></i> Confirmar Pedido (Transferencia)</button>
            `);
        }
    });

    $(document).on('click', '#btn-iniciar-scanner', function() {
        if (html5QrCode) {
            detenerScanner();
        }
        const wrapper = $('#scanner-wrapper');
        wrapper.show();
        wrapper.html(`
            <div class="qr-scanner-container">
                <h6><i class="fas fa-camera"></i> Escaneando QR...</h6>
                <div id="qr-reader"></div>
                <button class="btn-cerrar-scanner" id="btn-cerrar-scanner">
                    <i class="fas fa-times"></i> Cerrar Escáner
                </button>
                <div id="qr-resultado"></div>
            </div>
        `);
        iniciarScanner();
    });

    $(document).on('click', '#btn-cerrar-scanner', function() {
        detenerScanner();
        $('#scanner-wrapper').hide();
    });

    function iniciarScanner() {
        html5QrCode = new Html5Qrcode("qr-reader");
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        html5QrCode.start(
            { facingMode: "environment" },
            config,
            onScanSuccess,
            onScanFailure
        ).catch((err) => {
            console.error("Error al iniciar scanner:", err);
            $('#qr-resultado').html(`
                <div class="qr-resultado" style="background: rgba(211, 47, 47, 0.15); border-color: rgba(211, 47, 47, 0.5);">
                    <i class="fas fa-exclamation-triangle"></i> No se pudo acceder a la cámara. 
                    Por favor permite el acceso o escanea el código QR directamente con la app de tu banco.
                </div>
            `);
        });
    }

    function onScanSuccess(decodedText, decodedResult) {
        detenerScanner();
        let html = `<div class="qr-resultado"><i class="fas fa-check-circle"></i> <strong>¡QR Detectado!</strong><br><br>`;
        if (decodedText.startsWith('http')) {
            html += `<a href="${decodedText}" target="_blank">${decodedText}</a>
                <br><br><a href="${decodedText}" target="_blank" class="btn btn-success btn-sm" style="border-radius: 50px; padding: 8px 20px;">
                    <i class="fas fa-external-link-alt"></i> Abrir Enlace
                </a>`;
        } else {
            html += `<strong>Contenido:</strong> ${decodedText}`;
        }
        html += `</div>`;
        $('#qr-resultado').html(html);
    }

    function onScanFailure(error) {
        // No mostramos errores constantemente
    }

    function detenerScanner() {
        if (html5QrCode != null) {
            html5QrCode.stop().then((ignore) => {
                html5QrCode.clear();
                html5QrCode = null;
            }).catch((err) => {
                console.error("Error al detener scanner:", err);
                html5QrCode = null;
            });
        }
    }

    $(document).on('click', '#confirmar-pedido-efectivo, #confirmar-pedido-transferencia', function() {
        const metodo = $(this).text().includes('Transferencia') ? 'Transferencia Bancaria' : 'Efectivo';
        enviarPedidoWhatsApp(metodo);
        $('#pagoModal').modal('hide');
        detenerScanner();
        setTimeout(() => { $('#calificacionModal').modal('show'); }, 1500);
        carrito = [];
        actualizarCarrito();
    });

    function enviarPedidoWhatsApp(metodoPago) {
        if (carrito.length === 0) return;
        const clienteNombre = ($('#cliente-nombre').val() || '').trim();
        const clienteTelefono = ($('#cliente-telefono').val() || '').trim();
        const clienteDireccion = ($('#cliente-direccion').val() || '').trim();
        const compartirUbicacion = $('#cliente-compartir-ubicacion').is(':checked');
        const clienteUbicacionLink = ($('#cliente-ubicacion-link').val() || '').trim();

        let mensaje = `Hola, me ayudas con este pedido a domicilio en ${nombreNegocio}?\n\n`;
        if (clienteNombre) mensaje += `Nombre: ${clienteNombre}\n`;
        if (clienteTelefono) mensaje += `Teléfono: ${clienteTelefono}\n`;
        if (clienteDireccion) mensaje += `Dirección/Referencia: ${clienteDireccion}\n`;
        if (compartirUbicacion && clienteUbicacionLink) mensaje += `Ubicación (GPS): ${clienteUbicacionLink}\n`;
        if (clienteNombre || clienteTelefono || clienteDireccion || (compartirUbicacion && clienteUbicacionLink)) mensaje += `\n`;

        mensaje += `Detalle del pedido:\n`;
        let total = 0;
        carrito.forEach(item => {
            const sub = item.precio * item.cantidad;
            total += sub;
            mensaje += `• ${item.cantidad}x ${item.nombre} = $ ${sub.toFixed(2)}\n`;
        });
        mensaje += `\nTotal a pagar: $ ${total.toFixed(2)}`;
        mensaje += `\nMétodo de pago: ${metodoPago}`;
        mensaje += `\n\nGracias.`;
        const url = `https://wa.me/${telefonoNegocio}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    }

    $(document).on('click', '#rating-stars i', function() {
        const valor = $(this).data('valor');
        $('#rating-stars i').each(function() {
            if ($(this).data('valor') <= valor) $(this).removeClass('far').addClass('fas activo');
            else $(this).removeClass('fas activo').addClass('far');
        });
        $.ajax({
            url: 'send_rating.php',
            type: 'POST',
            data: { puntuacion: valor, comentario: 'Cliente desde mesa digital' },
            success: function() { $('#mensaje-calificacion').html('<div class="alert alert-success">¡Gracias por tu calificación de ' + valor + ' estrellas! 🎉</div>'); },
            error: function() { $('#mensaje-calificacion').html('<div class="alert alert-danger">Error al enviar, pero tu opinión cuenta.</div>'); }
        });
    });

    $(document).on('click', '.filter-btn', function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        const filter = $(this).data('filter');
        if (filter === 'all') $('.producto-item').show();
        else {
            $('.producto-item').hide();
            $(`.producto-item[data-categoria="${filter}"]`).show();
        }
    });
});
