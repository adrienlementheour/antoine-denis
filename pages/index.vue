<template>
  <section class="container">
    <div>
      <div class="projects" :class="{'touch-device': touchDevice}">
        <div v-for="(project, projectIndex) in projects" :key="projectIndex" class="project">
          <div class="project-infos">
            <div class="project-details">
              <h3 v-if="project.data.name[0].text" class="project-name">{{ project.data.name[0].text }}</h3>
              <span v-if="project.data.type" class="project-type">{{ project.data.type }}</span>
              <span v-if="project.data.year" class="project-year">{{ project.data.year }}</span>
            </div>
            <div :class="'swiper-pagination-'+projectIndex" class="swiper-pagination" />
          </div>
          <div class="project-content">
            <div v-if="project.data.slider.length == 1">
              <!-- Only one file, image or video -->
              <div v-if="Object.keys(project.data.slider[0].slider_video).length > 0" v-html="project.data.slider[0].slider_video.html" class="wrapper-video">
                <!-- Video -->
              </div>
              <div v-else-if="Object.keys(project.data.slider[0].slider_image).length > 0" class='wrapper-img' ref='wrapperImg'>
                <!-- Image -->
                <img :src="project.data.slider[0].slider_image.url" :alt="project.data.slider[0].slider_image.alt">
              </div>
            </div>
            <div v-else>
              <!-- More than one file => slider -->
              <div v-swiper="{
                loop: true,
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 20,
                pagination: {
                  el: '.swiper-pagination-'+projectIndex,
                  type: 'fraction'
                },
                navigation: {
                  nextEl: '.btn-slider-next-'+projectIndex,
                  prevEl: '.btn-slider-prev-'+projectIndex
                }
              }" :instanceName="'instance-'+projectIndex">
                <div class="swiper-wrapper">
                  <div v-for="(singleslide, index) in project.data.slider" :key="index" class="swiper-slide">
                    <div v-if="Object.keys(singleslide.slider_video).length > 0" :style="{maxWidth: singleslide.slider_video.width + 'px'}" class="wrapper-video" v-html="singleslide.slider_video.html">
                      <!-- Video -->
                    </div>
                    <div v-else-if="Object.keys(singleslide.slider_image).length > 0" class='wrapper-img' ref='wrapperImg'>
                      <!-- Image -->
                      <img :src="singleslide.slider_image.url" :alt="singleslide.slider_image.alt">
                    </div>
                  </div>
                </div>
              </div>
              <div class='btn-slider btn-slider-next' :class="'btn-slider-next-'+projectIndex"></div>
              <div class='btn-slider btn-slider-prev' :class="'btn-slider-prev-'+projectIndex"></div>
            </div>
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
        return {
            wrapperImg: null,
            imageSource: null,
            touchDevice: false
        };
    },
    async asyncData() {
        var apiEndpoint = 'https://antoine-denis.cdn.prismic.io/api/v2';
        let projects = {};

        const api = await Prismic.getApi(apiEndpoint);
        await api
            .query(Prismic.Predicates.at('document.type', 'projet'), {
                orderings: '[my.projet.date desc]'
            })
            .then(function(response) {
                // response is the response object, response.results holds the documents
                projects = response.results;
            });

        return { projects };
    },
    methods: {
        checkTouchDevice() {
            return 'ontouchstart' in document.documentElement;
        }
    },
    mounted: function() {
        // Detect objectFit support
        if ('objectFit' in document.documentElement.style === false) {
            // assign HTMLCollection with parents of images with objectFit to variable
            this.wrapperImg = this.$refs.wrapperImg;
            // Loop through HTMLCollection
            for (var i = 0; i < this.wrapperImg.length; i++) {
                // Asign image source to variable
                this.imageSource = this.wrapperImg[i].querySelector('img').src;
                this.wrapperImg[i].querySelector('img').style.display = 'none';
                this.wrapperImg[i].style.backgroundSize = 'cover';
                this.wrapperImg[i].style.backgroundImage = 'url(' + this.imageSource + ')';
                this.wrapperImg[i].style.backgroundPosition = 'center center';
            }
        }
        if (this.checkTouchDevice()) {
            this.touchDevice = true;
        }
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
.projects {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    &.touch-device {
        .btn-slider {
            display: none;
        }
    }
    &:not(.touch-device) {
        .project-infos {
            opacity: 0;
        }
        .project {
            &:hover {
                .project-infos {
                    opacity: 1;
                }
            }
        }
    }
}
.project {
    position: relative;
    width: calc(50% - 10px);
    margin: 0 0 20px;
    .wrapper-video,
    img {
        width: 100%;
    }
}
.project-content {
    position: relative;
    &:before {
        content: '';
        display: block;
        width: 100%;
        padding-bottom: 73.3333%;
    }
    > div {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
}
.wrapper-img {
    width: 100%;
    height: 100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.wrapper-video {
    width: 100%;
    height: 100%;
    background: $black;
    /deep/ iframe,
    /deep/ embed,
    /deep/ object {
        width: 100%;
        height: 100%;
    }
}
.project-infos {
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    line-height: 20px;
    z-index: 2;
}
.project-details {
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    > * {
        margin-right: 25px;
    }
}
.project-name {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1.5rem;
    font-family: $suisse;
    font-weight: 500;
    font-style: italic;
}

@media (max-width: $desktop-small) {
    .projects {
        &:not(.touch-device) {
            .project-infos {
                opacity: 1;
            }
        }
    }
    .project {
        width: 100%;
    }
}

@media (max-width: $phone) {
    .project {
        margin: 0;
    }
    .project-infos {
        position: relative;
        top: auto;
        left: auto;
        right: auto;
    }
    .project-details {
        flex-direction: column;
        margin-right: 35px;
        > * {
            margin-right: 0;
        }
    }
}
</style>
