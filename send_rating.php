<?php
$archivo = 'data/ratings.json';
$puntuacion = isset($_POST['puntuacion']) ? intval($_POST['puntuacion']) : 0;
$comentario = isset($_POST['comentario']) ? $_POST['comentario'] : '';
$fecha = date('Y-m-d H:i:s');
if ($puntuacion < 1 || $puntuacion > 5) { echo json_encode(['error' => 'Puntuación inválida']); exit; }
$ratings = [];
if (file_exists($archivo)) {
    $contenido = file_get_contents($archivo);
    if (!empty($contenido)) { $ratings = json_decode($contenido, true); if (!is_array($ratings)) $ratings = []; }
}
$ratings[] = ['puntuacion' => $puntuacion, 'comentario' => $comentario, 'fecha' => $fecha];
file_put_contents($archivo, json_encode($ratings, JSON_PRETTY_PRINT));
echo json_encode(['success' => true, 'mensaje' => 'Calificación guardada']);
?>