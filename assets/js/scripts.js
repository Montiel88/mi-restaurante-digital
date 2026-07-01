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
        let resumen = '', total = 0;
        carrito.forEach(item => {
            const sub = item.precio * item.cantidad;
            total += sub;
            resumen += `${item.cantidad}x ${item.nombre} - $ ${sub.toFixed(2)}\n`;
        });
        resumen += `\nTOTAL: $ ${total.toFixed(2)}`;
        const modalBody = $('#modal-pago-body');
        modalBody.html(`
            <h6>Resumen de tu pedido:</h6>
            <pre class="bg-light p-3 rounded" style="border-left: 4px solid #FFD700;">${resumen}</pre>
            <hr>
            <h6>Selecciona método de pago:</h6>
            <div class="d-flex gap-3 mb-3">
                <button class="btn btn-outline-primary w-50 p-3 metodo-pago" data-metodo="efectivo">
                    <i class="fas fa-money-bill fa-2x d-block"></i> Efectivo
                </button>
                <button class="btn btn-outline-success w-50 p-3 metodo-pago" data-metodo="transferencia">
                    <i class="fas fa-university fa-2x d-block"></i> Transferencia
                </button>
            </div>
            <div id="detalle-pago" class="mt-3"></div>
        `);
        $('#pagoModal').modal('show');
    });

    $(document).on('click', '.metodo-pago', function() {
        const metodo = $(this).data('metodo');
        const detalleDiv = $('#detalle-pago');
        if (metodo === 'efectivo') {
            detalleDiv.html(`
                <div class="alert alert-info"><i class="fas fa-info-circle"></i> Pagas en efectivo al recibir tu pedido.</div>
                <button class="btn btn-success w-100" id="confirmar-pedido-efectivo"><i class="fab fa-whatsapp"></i> Confirmar Pedido (Efectivo)</button>
            `);
        } else {
            detalleDiv.html(`
                <div class="alert alert-secondary">
                    <h6>Datos para Transferencia:</h6>
                    <p class="mb-1"><strong>Banco:</strong> <?php echo BANCO_NOMBRE; ?></p>
                    <p class="mb-1"><strong>Tipo:</strong> <?php echo BANCO_TIPO_CUENTA; ?></p>
                    <p class="mb-1"><strong>N° Cuenta:</strong> <?php echo BANCO_NUMERO; ?></p>
                    <p class="mb-1"><strong>Titular:</strong> <?php echo BANCO_TITULAR; ?></p>
                    <p class="mb-1"><strong>Cédula:</strong> <?php echo BANCO_CEDULA; ?></p>
                    <div class="text-center mt-2">
                        <img src="<?php echo BANCO_QR_IMG; ?>" alt="QR Banco" style="max-width:150px;" onerror="this.style.display='none'">
                        <p class="small text-muted">Escanea el QR para transferir.</p>
                    </div>
                </div>
                <button class="btn btn-success w-100" id="confirmar-pedido-transferencia"><i class="fab fa-whatsapp"></i> Confirmar Pedido (Transferencia)</button>
            `);
        }
    });

    $(document).on('click', '#confirmar-pedido-efectivo, #confirmar-pedido-transferencia', function() {
        const metodo = $(this).text().includes('Transferencia') ? 'Transferencia Bancaria' : 'Efectivo';
        enviarPedidoWhatsApp(metodo);
        $('#pagoModal').modal('hide');
        setTimeout(() => { $('#calificacionModal').modal('show'); }, 1500);
        carrito = [];
        actualizarCarrito();
    });

    function enviarPedidoWhatsApp(metodoPago) {
        if (carrito.length === 0) return;
        let mensaje = `Hola, soy de la mesa (especifica tu mesa). Quiero hacer el siguiente pedido:\n\n`;
        let total = 0;
        carrito.forEach(item => {
            const sub = item.precio * item.cantidad;
            total += sub;
            mensaje += `- ${item.cantidad}x ${item.nombre} = $ ${sub.toFixed(2)}\n`;
        });
        mensaje += `\n*Total a pagar:* $ ${total.toFixed(2)}`;
        mensaje += `\n*Método de pago:* ${metodoPago}`;
        mensaje += `\n\n¡Gracias, espero mi pedido!`;
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