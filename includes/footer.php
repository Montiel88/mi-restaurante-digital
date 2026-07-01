</main>
<section id="contacto" class="container-fluid" style="background: rgba(10,10,10,0.9); color: #e0e0e0; padding: 40px 0; border-top: 3px solid #FFD700;">
    <div class="container">
        <div class="row g-4">
            <div class="col-md-6">
                <h3 style="font-family: 'Anton', sans-serif; color: #FFD700; font-size: 1.8rem;"><i class="fas fa-map-pin"></i> Contáctanos</h3>
                <p><i class="fas fa-map-marker-alt" style="color: #FFD700;"></i> <?php echo DIRECCION; ?></p>
                <p><i class="fas fa-phone" style="color: #FFD700;"></i> <a href="tel:<?php echo TELEFONO1; ?>" class="text-white text-decoration-none"><?php echo TELEFONO1; ?></a> / <a href="tel:<?php echo TELEFONO2; ?>" class="text-white text-decoration-none"><?php echo TELEFONO2; ?></a></p>
                <p><i class="fab fa-whatsapp" style="color: #25D366;"></i> <a href="https://wa.me/<?php echo TELEFONO1; ?>" target="_blank" class="text-white text-decoration-none">WhatsApp (<?php echo TELEFONO1; ?>)</a></p>
                <div class="social-icons mt-3">
                    <a href="<?php echo URL_INSTAGRAM; ?>" target="_blank" class="btn btn-outline-light me-2" style="border-radius: 50%; width: 45px; height: 45px; display: inline-flex; align-items: center; justify-content: center;"><i class="fab fa-instagram"></i></a>
                    <a href="<?php echo URL_FACEBOOK; ?>" target="_blank" class="btn btn-outline-light me-2" style="border-radius: 50%; width: 45px; height: 45px; display: inline-flex; align-items: center; justify-content: center;"><i class="fab fa-facebook-f"></i></a>
                    <a href="<?php echo URL_TIKTOK; ?>" target="_blank" class="btn btn-outline-light me-2" style="border-radius: 50%; width: 45px; height: 45px; display: inline-flex; align-items: center; justify-content: center;"><i class="fab fa-tiktok"></i></a>
                </div>
            </div>
            <div class="col-md-6">
                <div class="mapa-container text-center">
                    <div class="mapa-icono" id="btnMostrarMapa">
                        <i class="fas fa-location-dot"></i> <!-- Nuevo icono de ubicación -->
                    </div>
                    <div class="mapa-iframe" id="mapaIframe">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8038!2d-78.456789!3d-0.234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59b1b9c7f8a0b%3A0x9f8a7b6c5d4e3f2a!2sPuente%206%20-%20Entrada%20al%2090!5e0!3m2!1ses!2sec!4v1234567890" 
                                width="100%" height="280" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<footer style="background: #0a0a0a; color: #888; text-align: center; padding: 15px 0; border-top: 1px solid #333;">
    <div class="container">
        <p class="mb-0">&copy; 2026 <?php echo NEGOCIO_NOMBRE; ?>. Todos los derechos reservados.</p>
        <p class="mb-0 small">Hecho con <i class="fas fa-heart" style="color: #FFD700;"></i> para digitalizar tu emprendimiento.</p>
    </div>
</footer>
<a href="https://wa.me/<?php echo TELEFONO1; ?>?text=Hola%21%20Quiero%20hacer%20un%20pedido" 
   class="btn btn-success btn-flotante-wsp" target="_blank" 
   style="position: fixed; bottom: 100px; right: 20px; z-index: 999; border-radius: 50px; padding: 12px 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); background: #25D366; border: none;">
   <i class="fab fa-whatsapp fa-2x"></i>
</a>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="assets/js/scripts.js"></script>
<script>
document.getElementById('btnMostrarMapa').addEventListener('click', function() {
    var iframe = document.getElementById('mapaIframe');
    iframe.classList.toggle('mostrar');
});
</script>
</body>
</html>