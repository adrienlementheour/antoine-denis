<template>
  <section class="container">
    <div>
      <div class="projects">
        <div v-for="(project, projectIndex) in projects" :key="projectIndex" :class="{'half' : project.data.width === '50%'}" class="project">
          <div v-if="project.data.slider.length == 1">
            <!-- Only one file, image or video -->
            <!-- <div v-if="Object.keys(project.data.slider[0].slider_video).length > 0" :style="{maxWidth: project.data.slider[0].slider_video.width + 'px'}" class="wrapper-video"> -->
            <div v-if="Object.keys(project.data.slider[0].slider_video).length > 0" class="wrapper-video">
              <!-- Video -->
              <div :style="{paddingBottom: (project.data.slider[0].slider_video.height / project.data.slider[0].slider_video.width) * 100 + '%'}" class="box-video" />
              <div class="content-video" v-html="project.data.slider[0].slider_video.html" />
            </div>
            <div v-else-if="Object.keys(project.data.slider[0].slider_image).length > 0">
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
              spaceBetween: 30,
              pagination: {
                el: '.swiper-pagination-'+projectIndex,
                type: 'fraction'
              }
            }" :instanceName="'instance-'+projectIndex">
              <div class="swiper-wrapper">
                <div v-for="(singleslide, index) in project.data.slider" :key="index" class="swiper-slide">
                  <div v-if="Object.keys(singleslide.slider_video).length > 0" :style="{maxWidth: singleslide.slider_video.width + 'px'}" class="wrapper-video">
                    <!-- Video -->
                    <div :style="{paddingBottom: (singleslide.slider_video.height / singleslide.slider_video.width) * 100 + '%'}" class="box-video" />
                    <div class="content-video" v-html="singleslide.slider_video.html" />
                  </div>
                  <div v-else-if="Object.keys(singleslide.slider_image).length > 0">
                    <!-- Image -->
                    <img :src="singleslide.slider_image.url" :alt="singleslide.slider_image.alt">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="project-infos">
            <div class="project-details">
              <h3 v-if="project.data.name[0].text" class="project-name">{{ project.data.name[0].text }}</h3>
              <span v-if="project.data.type" class="project-type">{{ project.data.type }}</span>
              <span v-if="project.data.year" class="project-year">{{ project.data.year }}</span>
            </div>
            <div :class="'swiper-pagination-'+projectIndex" class="swiper-pagination" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript';

export default {
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
</style>
