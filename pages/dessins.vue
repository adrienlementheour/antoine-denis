<template>
  <section>
    <div :class="{'touch-device': touchDevice}" class="container-dessins">
      <div class="wrapper-dessins">
        <div class="wrapper-logo-dessins">
          <div class="w-logo">
            <img :src="data.dessins_logo.url" :alt="data.dessins_logo.alt">
          </div>
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
        <div class="btn-slider btn-slider-next"/>
        <div class="btn-slider btn-slider-prev"/>
      </div>
    </div>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript';
import vClickOutside from 'v-click-outside';

export default {
    head: {
        bodyAttrs: {
            class: 'bg-white'
        }
    },
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
                keyboard: true,
                navigation: {
                    nextEl: '.btn-slider-next',
                    prevEl: '.btn-slider-prev'
                }
            },
            touchDevice: false
        };
    },
    mounted: function() {
        if (this.checkTouchDevice()) {
            this.touchDevice = true;
            this.swipers.forEach(el => {
                el.swiper.params.speed = 300;
            });
        }
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
        },
        checkTouchDevice() {
            return 'ontouchstart' in document.documentElement;
        }
    }
};
</script>

<style scoped lang='scss'>
.container-dessins {
    position: relative;
    &.touch-device {
        .btn-slider {
            display: none;
        }
    }
}

// Swiper
.container-swiper {
    position: fixed;
    top: 15px;
    height: calc(100vh - 30px);
    left: 15px;
    right: 15px;
    background: $white;
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
    justify-content: center;
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
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    padding: 15px;
}
.wrapper-logo-dessins {
    grid-column-start: 1;
    grid-column-end: 3;
    aspect-ratio: 2 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    position: relative;
    .w-logo {
        position: absolute;
        inset: 0;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
.dessin {
    aspect-ratio: 1 / 1;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

@media (min-width: $phone) {
    .wrapper-dessins {
        grid-template-columns: repeat(4, 1fr);
    }
    .wrapper-logo-dessins {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 2;
        aspect-ratio: auto;
    }
}
@media (min-width: $tablet) {
    .container-swiper {
        left: calc(#{percentage(1/5)} + 15px);
        right: calc(#{percentage(1/5)} + 15px);
    }
    .wrapper-dessins {
        grid-template-columns: repeat(5, 1fr);
    }
}
@media (min-width: $desktop-small) {
    .container-swiper {
        left: calc(#{percentage(2/7)} + 15px);
        right: calc(#{percentage(2/7)} + 15px);
    }
    .wrapper-dessins {
        grid-template-columns: repeat(7, 1fr);
    }
    .wrapper-logo-dessins {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 3;
    }
}
@media (min-width: $desktop) {
    .container-swiper {
        left: calc(#{percentage(2/8)} + 15px);
        right: calc(#{percentage(2/8)} + 15px);
    }
    .wrapper-dessins {
        grid-template-columns: repeat(8, 1fr);
    }
}
@media (min-width: $desktop-large) {
    .container-swiper {
        left: calc(#{percentage(3/11)} + 15px);
        right: calc(#{percentage(3/11)} + 15px);
    }
    .wrapper-dessins {
        grid-template-columns: repeat(11, 1fr);
    }
}
</style>
