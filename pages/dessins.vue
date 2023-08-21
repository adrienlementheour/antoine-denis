<template>
  <section>
    <div class="container-dessins">
      <div class="wrapper-dessins">
        <div class="wrapper-logo-dessins">
          Logo dessins
        </div>
        <div v-for="(dessin, dessinIndex) in data.dessins" :key="dessinIndex" class="dessin" @click="openDessin(dessinIndex)">
          <img :src="dessin.dessin.url" :alt="dessin.dessin.alt" class="img-dessin">
        </div>
      </div>
      <div v-click-outside="closeSlider" :class="{ 'is-visible': showSlider }" class="container-swiper">
        <div v-swiper="swiperOption" ref="mySwiper">
          <div class="swiper-wrapper">
            <div v-for="(dessin, dessinIndex) in data.dessins" :key="dessinIndex+'1'" class="swiper-slide">
              <img :src="dessin.dessin.url" :alt="dessin.dessin.alt">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript';
import vClickOutside from 'v-click-outside';

export default {
    directives: {
        clickOutside: vClickOutside.directive
    },
    layout: 'noheader',
    data() {
        return {
            showSlider: false,
            swiperOption: {
                loop: true,
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 20,
                effect: 'slide',
                speed: 0,
                keyboard: true
            }
        };
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
    },
    methods: {
        closeSlider(event) {
            if (event.srcElement._prevClass !== 'img-dessin') {
                this.showSlider = false;
            }
        },
        openDessin(index) {
            if (!this.showSlider) this.showSlider = true;
            this.$refs.mySwiper.swiper.slideTo(index, 0);
        }
    }
};
</script>

<style scoped lang='scss'>
.container-dessins {
    position: relative;
}

// Swiper
.container-swiper {
    position: fixed;
    top: 15px;
    height: calc(100vh - 30px);
    left: calc(#{percentage(3/11)} + 15px);
    right: calc(#{percentage(3/11)} + 15px);
    background: $grey-dark;
    border: 1px solid yellow;
    opacity: 0;
    visibility: hidden;
    &.is-visible {
        opacity: 1;
        visibility: visible;
    }
}
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
.swiper-slide {
    display: flex;
    align-items: center;
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
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    gap: 30px;
    padding: 15px;
}
.wrapper-logo-dessins {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
    background: grey;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
}
.dessin {
    // width: percentage(1/11);
    aspect-ratio: 1 / 1;
    // padding: 15px;
    border: 1px solid red;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>
