<script setup>
import animationLottie from "@/content/animation_index.json";
const { $anime } = useNuxtApp();
const isVisible = ref(true);
const mobileScin = ref(100);
const lottieAnimation = ref(null);
const animationFun = () => {
  $anime({
    targets: [".title", ".title-h2"],
    translateY: [mobileScin.value],
    easing: "easeInOutExpo",
    delay: 0,
    opacity: {
      value: 1,
    },
  });
};
const mobailScrin = () => {
  window.addEventListener("resize", (event) => {
    if (event.target.innerWidth <= 800) {
      mobileScin.value = 50;
    } else {
      mobileScin.value = 100;
    }
  });
  if (document.documentElement.clientWidth <= 800) {
    mobileScin.value = 50;
  } else {
    mobileScin.value = 100;
  }
};
onMounted(() => {
  mobailScrin();
  animationFun();
});
onBeforeUnmount(() => {
  // Сброс анимации перед размонтированием компонента
  $anime({
    targets: [".title", ".title-h2"],
    translateY: 0, // Возвращаем начальное положение
    opacity: 0, // Скрываем элементы
    duration: 0, // Длительность анимации равна 0, чтобы мгновенно выполнить сброс
  });
});
onBeforeUnmount(() => {
  lottieAnimation.value.destroy();
});
useHead({
  title: "FastSite - Разботка web - приложений Nuxt3",
  meta: [
    {
      hid: "description",
      name: "description",
      content: "Создаём быстрые сайты любого типа по выгодным ценам.",
    },
    {
      hid: "og:title",
      property: "og:title",
      content: "FastSite - Разботка web - приложений Nuxt3",
    },
    {
      hid: "og:description",
      property: "og:description",
      content: "Создаём быстрые сайты любого типа по выгодным ценам.",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: `https://fastsite.pro/nuxt-imf.webp`,
    },
  ],
});
</script>

<template>
  <div>
    <div class="bd-docs-main">
      <div class="container is-max-desktop">
        <div class="content">
          <div class="index-title">
            <h1 class="title">Курсы по web - разработке</h1>
            <div class="title-h2">
              <span>Доступные материалы для обучения.</span>
            </div>

            <div class="index-lottie">
              <client-only>
                <Vue3Lottie
                  ref="lottieAnimation"
                  :animationData="animationLottie"
                  :height="300"
                  :width="500"
                />
              </client-only>
            </div>
          </div>
          <div class="index-desctiption">
            <div class="columns is-multiline">
              <div class="column is-4">
                <div
                  v-show="isVisible"
                  data-aos="fade-up"
                  data-aos-delay="300"
                  data-aos-once="true"
                >
                  <div class="index-desctiption-block">
                    <strong>Разработка корпаративных сайтов, лендингов.</strong>
                    <Icon name="solar:programming-broken" />
                  </div>
                </div>
              </div>
              <div class="column is-4">
                <div
                  v-show="isVisible"
                  data-aos="fade-up"
                  data-aos-delay="400"
                  data-aos-once="true"
                >
                  <div class="index-desctiption-block">
                    <strong>Интернет магазины, СЕО оптимизация.</strong>
                    <Icon name="solar:screencast-broken" />
                  </div>
                </div>
              </div>
              <div class="column is-4">
                <div
                  v-show="isVisible"
                  data-aos="fade-up"
                  data-aos-delay="500"
                  data-aos-once="true"
                >
                  <div class="index-desctiption-block">
                    <strong>CRM систем и индивидуальных решений.</strong>
                    <Icon name="solar:code-square-broken" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="index-stack">
            <IndexTopCategory />
          </div>
          <div class="index-new">
            <IndexNewCourse />
          </div>
          <div class="index-project">
            <IndexTopCourse />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
