<template>
  <section class="container">
    <div>
      <h1 class="title">
        antoine-denis
      </h1>
      <h2 class="subtitle">
        Portfolio d&#39;Antoine Denis, graphiste
      </h2>
      <div class="projects">
        <div v-for="project in projects" :key="project.data.id" class="project">
          {{ project.data }}
          <div v-if="project.data.slider.length == 1">
            <img :src="project.data.slider[0].slider_image.url" :alt="project.data.slider[0].slider_image.alt">
          </div>
          <div v-else>
            Slider
          </div>
          {{ project.data.nom_du_projet[0].text }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript';

export default {
  // components: {
  // },
  async asyncData() {
    var apiEndpoint = 'https://antoine-denis.cdn.prismic.io/api/v2';
    let home = {};
    let projects = {};

    const api = await Prismic.getApi(apiEndpoint);
    await api
      .query(Prismic.Predicates.at('document.type', 'home'))
      .then(function(response) {
        // response is the response object, response.results holds the documents
        home = response.results;
      });
    await api
      .query(Prismic.Predicates.at('document.type', 'projet'), {
        orderings: '[my.projet.date desc]'
      })
      .then(function(response) {
        // response is the response object, response.results holds the documents
        projects = response.results;
      });

    return { home, projects };
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
