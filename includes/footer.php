</main>
<section id="contacto" class="container-fluid" style="background: rgba(10,10,10,0.9); color: #e0e0e0; padding: 18px 0; border-top: 2px solid #FFD700;">
    <div class="container">
        <div class="row g-2 align-items-center">
            <div class="col-md-6">
                <h3 style="font-family: 'Anton', sans-serif; color: #FFD700; font-size: 1.35rem; margin-bottom: 10px;"><i class="fas fa-map-pin"></i> Contáctanos</h3>
                <p style="font-size: 0.95rem; margin-bottom: 6px;"><i class="fas fa-map-marker-alt" style="color: #FFD700;"></i> <?php echo DIRECCION; ?></p>
                <p style="font-size: 0.95rem; margin-bottom: 6px;"><i class="fas fa-phone" style="color: #FFD700;"></i> <a href="tel:<?php echo TELEFONO1; ?>" class="text-white text-decoration-none"><?php echo TELEFONO1; ?></a> / <a href="tel:<?php echo TELEFONO2; ?>" class="text-white text-decoration-none"><?php echo TELEFONO2; ?></a></p>
                <p style="font-size: 0.95rem; margin-bottom: 8px;"><i class="fab fa-whatsapp" style="color: #25D366;"></i> <a href="https://wa.me/<?php echo TELEFONO_WHATSAPP; ?>?text=¡Bienvenido%20a%20QÉHVÉ%20-%20La%20Hueca%20del%20Sabor!%20¿En%20qué%20te%20puedo%20ayudar?" target="_blank" class="text-white text-decoration-none">WhatsApp (<?php echo TELEFONO1; ?>)</a></p>
                <div class="social-icons mt-3">
                    <a href="<?php echo URL_INSTAGRAM; ?>" target="_blank" class="btn btn-outline-light me-2"><i class="fab fa-instagram"></i></a>
                    <a href="<?php echo URL_FACEBOOK; ?>" target="_blank" class="btn btn-outline-light me-2"><i class="fab fa-facebook-f"></i></a>
                    <a href="<?php echo URL_TIKTOK; ?>" target="_blank" class="btn btn-outline-light me-2"><i class="fab fa-tiktok"></i></a>
                </div>
            </div>
            <div class="col-md-6">
                <div class="mapa-container text-center">
                    <a href="https://www.google.com/maps/place/PGCC%2BH2V+Papeleria+Sofia,+Unnamed+Road,+Quito/data=!4m2!3m1!1s0x91d5981ec6dfabef:0xc8a4f8be7e5bdadc!18m1!1e1?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBzI2LjI1LjUYACDXggMqiwEsOTQyNjc3MjcsOTQyOTIxOTUsOTQyOTk1MzIsMTAwNzk2NDk4LDEwMDc5Nzc2MSwxMDA3OTY1MzUsOTQyODA1NzYsOTQyMDczOTQsOTQyMDc1MDYsOTQyMDg1MDYsOTQyMTg2NTMsOTQyMjk4MzksOTQyNzUxNjgsOTQyNzk2MTksMTAwODEyOTk4QgJFQw%3D%3D&skid=c6deb1ec-3721-499c-ad4e-2cb1593ac841" target="_blank" style="text-decoration: none;">
                        <div class="mapa-icono mx-auto mb-2">
                            <i class="fas fa-location-dot"></i>
                        </div>
                        <div class="neon-text" style="font-family: 'Anton', sans-serif; font-size: 1.8rem; letter-spacing: 3px; cursor: pointer;">
                            QÉHVÉ
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
<footer style="background: #0a0a0a; color: #888; text-align: center; padding: 10px 0; border-top: 1px solid #333;">
    <div class="container">
        <p class="mb-0">&copy; 2026 <?php echo NEGOCIO_NOMBRE; ?>. Todos los derechos reservados.</p>
    </div>
</footer>
<a href="https://wa.me/<?php echo TELEFONO_WHATSAPP; ?>?text=¡Bienvenido%20a%20QÉHVÉ%20-%20La%20Hueca%20del%20Sabor!%20¿En%20qué%20te%20puedo%20ayudar?" 
   class="btn btn-success btn-flotante-wsp" target="_blank" 
   style="position: fixed; bottom: 100px; right: 20px; z-index: 999; border-radius: 50px; padding: 12px 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); background: #25D366; border: none;">
   <i class="fab fa-whatsapp fa-2x"></i>
</a>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="assets/js/scripts.js?v=20260727e"></script>

</body>
</html>
