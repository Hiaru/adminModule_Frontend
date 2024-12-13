<template>
  <div class="home-background mb-10">
    <div class="scrollable-content">
      <router-view />
    </div>
  </div>
</template>

<style>
.home-background {
  background-image: url('/src/assets/fondo_institucional.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: fixed;
  /* Esto fija el fondo en la ventana */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  /* Esto coloca el fondo detrás del contenido */
  overflow: auto;
  /* Esto permite el scroll en el fondo */
}

.scrollable-content {
  padding: 20px;
  /* Agrega un relleno para separar el contenido del borde */
}
</style>
