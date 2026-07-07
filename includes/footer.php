</main>
<section id="contacto" class="container-fluid" style="background: rgba(10,10,10,0.9); color: #e0e0e0; padding: 40px 0; border-top: 3px solid #FFD700;">
    <div class="container">
        <div class="row g-4">
            <div class="col-md-6">
                <h3 style="font-family: 'Anton', sans-serif; color: #FFD700; font-size: 1.8rem;"><i class="fas fa-map-pin"></i> Contáctanos</h3>
                <p><i class="fas fa-map-marker-alt" style="color: #FFD700;"></i> <?php echo DIRECCION; ?></p>
                <p><i class="fas fa-phone" style="color: #FFD700;"></i> <a href="tel:<?php echo TELEFONO1; ?>" class="text-white text-decoration-none"><?php echo TELEFONO1; ?></a> / <a href="tel:<?php echo TELEFONO2; ?>" class="text-white text-decoration-none"><?php echo TELEFONO2; ?></a></p>
                <p><i class="fab fa-whatsapp" style="color: #25D366;"></i> <a href="https://wa.me/593995338817" target="_blank" class="text-white text-decoration-none">WhatsApp (0995338817)</a></p>
                <div class="social-icons mt-3">
                    <a href="<?php echo URL_INSTAGRAM; ?>" target="_blank" class="btn btn-outline-light me-2" style="border-radius: 50%; width: 45px; height: 45px; display: inline-flex; align-items: center; justify-content: center;"><i class="fab fa-instagram"></i></a>
                    <a href="<?php echo URL_FACEBOOK; ?>" target="_blank" class="btn btn-outline-light me-2" style="border-radius: 50%; width: 45px; height: 45px; display: inline-flex; align-items: center; justify-content: center;"><i class="fab fa-facebook-f"></i></a>
                    <a href="<?php echo URL_TIKTOK; ?>" target="_blank" class="btn btn-outline-light me-2" style="border-radius: 50%; width: 45px; height: 45px; display: inline-flex; align-items: center; justify-content: center;"><i class="fab fa-tiktok"></i></a>
                </div>
            </div>
            <div class="col-md-6">
                <div class="mapa-container text-center">
                    <a href="https://www.google.com/maps/place/PGCC%2BH2V+Papeleria+Sofia,+Unnamed+Road,+Quito/data=!4m2!3m1!1s0x91d5981ec6dfabef:0xc8a4f8be7e5bdadc!18m1!1e1?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBzI2LjI1LjUYACDXggMqiwEsOTQyNjc3MjcsOTQyOTIxOTUsOTQyOTk1MzIsMTAwNzk2NDk4LDEwMDc5Nzc2MSwxMDA3OTY1MzUsOTQyODA1NzYsOTQyMDczOTQsOTQyMDc1MDYsOTQyMDg1MDYsOTQyMTg2NTMsOTQyMjk4MzksOTQyNzUxNjgsOTQyNzk2MTksMTAwODEyOTk4QgJFQw%3D%3D&skid=c6deb1ec-3721-499c-ad4e-2cb1593ac841" target="_blank" style="text-decoration: none;">
                        <div class="mapa-icono">
                            <i class="fas fa-location-dot"></i> <!-- Nuevo icono de ubicación -->
                        </div>
                    </a>
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
<a href="https://wa.me/<?php echo TELEFONO_WHATSAPP; ?>?text=Hola%21%20Quiero%20hacer%20un%20pedido" 
   class="btn btn-success btn-flotante-wsp" target="_blank" 
   style="position: fixed; bottom: 100px; right: 20px; z-index: 999; border-radius: 50px; padding: 12px 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); background: #25D366; border: none;">
   <i class="fab fa-whatsapp fa-2x"></i>
</a>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="assets/js/scripts.js"></script>

</body>
</html>