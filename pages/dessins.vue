<template>
  <section>
    <div>
      <div class="wrapper-dessins">
        <div v-for="(dessin, dessinIndex) in data.dessins" :key="dessinIndex" class="dessin">
          <img :src="dessin.dessin.url" :alt="dessin.dessin.alt">
        </div>
      </div>
      <div v-swiper="{
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        effect: 'slide',
        speed: 0
      }" ref="mySwiper">
        <div class="swiper-wrapper">
          <div v-for="(dessin, dessinIndex) in data.dessins" :key="dessinIndex+'1'" class="swiper-slide">
            <img :src="dessin.dessin.url" :alt="dessin.dessin.alt">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript';

export default {
    data() {
        return {};
    },
    async asyncData() {
        var apiEndpoint = 'https://antoine-denis.cdn.prismic.io/api/v2';
        let data = {};

        const api = await Prismic.getApi(apiEndpoint);
        await api.query(Prismic.Predicates.at('document.type', 'dessins')).then(function(response) {
            // response is the response object, response.results holds the documents
            data = response.results[0].data;
        });

        return { data };
    }
};
</script>

<style scoped lang='scss'>
// Swiper
.swiper-pagination {
    flex: 0 0 auto;
    position: relative;
    width: auto;
    bottom: auto;
    left: auto;
    top: auto;
    right: auto;
    text-align: right;
}
.swiper-container {
    height: 100%;
}
.swiper-wrapper {
    position: relative;
}
.btn-slider {
    display: block;
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 2;
    &:focus {
        outline: none;
    }
    &.btn-slider-next {
        right: 0;
        cursor: e-resize;
    }
    &.btn-slider-prev {
        left: 0;
        cursor: w-resize;
    }
}
/* Projects */
.wrapper-dessins {
    display: flex;
    flex-wrap: wrap;
}
.dessin {
    width: 220px;
    height: 220px;
    margin: 15px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>
