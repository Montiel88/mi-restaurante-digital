<?php 
include 'includes/config.php'; 
include 'includes/header.php'; 

$menuFile = 'data/menu.json';
$menuItems = [];
if (file_exists($menuFile)) {
    $menuData = file_get_contents($menuFile);
    $menuItems = json_decode($menuData, true);
    if (!is_array($menuItems)) $menuItems = [];
}

$categorias = array_unique(array_column($menuItems, 'categoria'));
$promociones = array_filter($menuItems, function($item) {
    return isset($item['promocion']) && $item['promocion'] === true;
});
$productos = array_filter($menuItems, function($item) {
    return !isset($item['promocion']) || $item['promocion'] !== true;
});
?>

<!-- BRAZAS -->
<div class="brazas-container">
    <div class="braza"></div><div class="braza"></div><div class="braza"></div>
    <div class="braza"></div><div class="braza"></div><div class="braza"></div>
    <div class="braza"></div><div class="braza"></div><div class="braza"></div>
    <div class="braza"></div>
</div>

<!-- HERO -->
<div class="container">
    <div class="hero-central">
        <div class="hero-box">
            <div class="brand-name">La Hueca del Sabor</div>
            <div class="brand-sub">¡Ven y Disfruta!</div>
            <div class="brand-divider"></div>

            <div class="mt-3">
                <a href="#menu-section" class="btn btn-kfc-gold me-2">Ver Menú</a>
                <a href="#promociones" class="btn btn-kfc-red">Promociones</a>
            </div>
        </div>
    </div>
</div>

<!-- MENÚ -->
<section id="menu-section" class="container productos-section">
    <h2 class="section-title">Nuestro Menú</h2>
    <div class="d-flex flex-wrap justify-content-center gap-2 mb-3">
        <button class="btn filter-btn active" data-filter="all">Todos</button>
        <?php 
        $cats = array_unique(array_column($productos, 'categoria'));
        foreach($cats as $cat): ?>
            <button class="btn filter-btn" data-filter="<?php echo strtolower($cat); ?>"><?php echo $cat; ?></button>
        <?php endforeach; ?>
        <button class="btn filter-btn" data-filter="promociones"><i class="fas fa-fire"></i> Promociones</button>
    </div>

    <?php if(empty($productos)): ?>
        <div class="alert alert-warning text-center">No hay productos disponibles.</div>
    <?php else: ?>
        <div class="row g-3" id="productos-grid">
            <?php foreach($productos as $item): ?>
            <div class="col-6 col-md-4 col-lg-3 producto-item" data-categoria="<?php echo strtolower($item['categoria']); ?>">
                <div class="card h-100">
                    <img src="<?php echo $item['imagen']; ?>" class="card-img-top" alt="<?php echo $item['nombre']; ?>">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title"><?php echo $item['nombre']; ?></h5>
                        <p class="card-text flex-grow-1"><?php echo $item['descripcion']; ?></p>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <span class="price-tag">$ <?php echo number_format($item['precio'], 2); ?></span>
                            <button class="btn btn-add-kfc agregar-carrito" 
                                    data-id="<?php echo $item['id']; ?>"
                                    data-nombre="<?php echo $item['nombre']; ?>"
                                    data-precio="<?php echo $item['precio']; ?>">
                                <i class="fas fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>

<!-- PROMOCIONES (centradas y al mismo nivel que el menú) -->
<section id="promociones" class="container promociones-section">
    <h2 class="section-title">🔥 Combos y Promociones</h2>
    <p class="text-center text-muted" style="font-size: 1rem;">Aprovecha nuestros precios especiales</p>
    <?php if(empty($promociones)): ?>
        <div class="no-promo-wrapper">
            <div class="no-promo-card">
                <i class="fas fa-info-circle"></i> No hay promociones disponibles.
            </div>
        </div>
    <?php else: ?>
        <div class="row g-3">
            <?php foreach($promociones as $item): ?>
            <div class="col-md-6 col-lg-4">
                <div class="card h-100">
                    <img src="<?php echo $item['imagen']; ?>" class="card-img-top" alt="<?php echo $item['nombre']; ?>">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title"><?php echo $item['nombre']; ?></h5>
                        <p class="card-text flex-grow-1"><?php echo $item['descripcion']; ?></p>
                        <span class="price-tag d-inline-block mb-2">$ <?php echo number_format($item['precio'], 2); ?></span>
                        <button class="btn btn-add-kfc w-100 mt-2 agregar-carrito" 
                                data-id="<?php echo $item['id']; ?>"
                                data-nombre="<?php echo $item['nombre']; ?>"
                                data-precio="<?php echo $item['precio']; ?>">
                            <i class="fas fa-cart-plus"></i> Añadir
                        </button>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>

<!-- CARRITO Y MODALES (igual que antes) -->
<button class="btn btn-dark btn-lg position-fixed bottom-0 end-0 m-3 rounded-circle shadow" type="button" data-bs-toggle="offcanvas" data-bs-target="#carritoOffcanvas" style="width:65px; height:65px; z-index:1050; background: #CC0000; border: 2px solid #FFD700;">
    <i class="fas fa-shopping-cart fa-2x text-white"></i>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark" id="carrito-count">0</span>
</button>

<div class="offcanvas offcanvas-end" tabindex="-1" id="carritoOffcanvas">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title"><i class="fas fa-shopping-cart"></i> Mi Pedido</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
        <div id="carrito-lista"><p class="text-muted text-center">Tu carrito está vacío.</p></div>
        <hr>
        <div class="d-flex justify-content-between fw-bold fs-5">
            <span>Total:</span>
            <span id="carrito-total" style="color: #FFD700;">$ 0.00</span>
        </div>
        <button class="btn btn-success w-100 mt-3" id="btn-finalizar-pedido" disabled>
            <i class="fab fa-whatsapp"></i> Finalizar Pedido
        </button>
        <p class="small text-muted text-center mt-2">* El pedido se envía directamente al WhatsApp del local.</p>
    </div>
</div>

<div class="modal fade" id="pagoModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title"><i class="fas fa-credit-card"></i> Método de Pago</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body" id="modal-pago-body"></div>
        <div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button></div>
    </div></div>
</div>

<div class="modal fade" id="calificacionModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered"><div class="modal-content">
        <div class="modal-header" style="background: #FFD700; color: #CC0000;"><h5 class="modal-title"><i class="fas fa-star"></i> ¡Califícanos!</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body text-center">
            <p>¿Cómo fue tu experiencia en <?php echo NEGOCIO_NOMBRE; ?>?</p>
            <div class="rating-stars fs-1" id="rating-stars">
                <i class="far fa-star" data-valor="1"></i><i class="far fa-star" data-valor="2"></i>
                <i class="far fa-star" data-valor="3"></i><i class="far fa-star" data-valor="4"></i>
                <i class="far fa-star" data-valor="5"></i>
            </div>
            <div id="mensaje-calificacion" class="mt-3"></div>
        </div>
        <div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button></div>
    </div></div>
</div>

<script>
    const telefonoNegocio = "<?php echo TELEFONO_WHATSAPP; ?>";
    const nombreNegocio = "<?php echo NEGOCIO_NOMBRE; ?>";
</script>

<?php include 'includes/footer.php'; ?>