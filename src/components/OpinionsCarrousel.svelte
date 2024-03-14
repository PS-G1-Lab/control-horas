<script>
  let currentSlide = 0;
  const userOpinions = [
    {
      name: "John Doe",
      opinion:
        "This is a great product! I highly recommend it to anyone looking for a reliable and efficient solution.",
      active: true,
    },
    {
      name: "Jane Doe",
      opinion:
        "I was skeptical at first, but this product has exceeded all of my expectations. It is easy to use and has made my life so much easier.",
      active: false,
    },
    {
      name: "Bob Smith",
      opinion:
        "I have been using this product for a few months now and I am very happy with it. It is well-designed and has many useful features.",
      active: false,
    },
  ];

  function nextSlide() {
    // Desactivar la slide actual
    userOpinions[currentSlide].active = false;
    // Avanzar a la siguiente slide
    currentSlide = (currentSlide + 1) % userOpinions.length;
    // Activar la siguiente slide
    userOpinions[currentSlide].active = true;
    updateCarousel();
  }

  function updateCarousel() {
    // Ocultar todas las slides
    userOpinions.forEach((opinion) => {
      opinion.active = false;
    });
    // Mostrar la slide actual
    userOpinions[currentSlide].active = true;
  }

  // Llamar a updateCarousel al cargar la página para mostrar el primer slide
  updateCarousel();

  // Configurar temporizador para cambiar de slide cada 10 segundos
  setInterval(nextSlide, 100); // 10000 ms = 10 segundos
</script>

<div class="relative">
  <div class="carousel w-full">
    {#each userOpinions as opinion (opinion)}
      <div
        class="carousel-item relative w-full"
        class:hidden={!opinion.active}
        class:block={opinion.active}
      >
        <div class="p-6 bg-base-100">
          <p class="text-lg font-semibold">{opinion.name}</p>
          <p class="mt-2">{opinion.opinion}</p>
        </div>
      </div>
    {/each}
  </div>
</div>
