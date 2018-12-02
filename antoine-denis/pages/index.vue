<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        antoine-denis
      </h1>
      <h2 class="subtitle">
        Portfolio d&#39;Antoine Denis, graphiste
      </h2>
      <ul id="example-1">
        <li v-for="project in projects" :key="project.data.id">
          {{ project.data.nom_du_projet[0].text }}
        </li>
      </ul>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue';
import Prismic from 'prismic-javascript';

export default {
  components: {
    Logo
  },
  // created() {
  //   var apiEndpoint = 'https://antoine-denis.cdn.prismic.io/api/v2';
  //   Prismic.getApi(apiEndpoint)
  //     .then(function(api) {
  //       return api.query(''); // An empty query will return all the documents
  //     })
  //     .then(
  //       function(response) {
  //         console.log('Documents: ', response.results);
  //       },
  //       function(err) {
  //         console.log('Something went wrong: ', err);
  //       }
  //     );
  // },
  async asyncData() {
    var apiEndpoint = 'https://antoine-denis.cdn.prismic.io/api/v2';
    let projects = {};

    const api = await Prismic.getApi(apiEndpoint);
    // const result = await api.getByUID('document.type', 'projet');
    // const result = await api.getByID('XAPjzRAAACcAYMxN');
    await api
      .query(Prismic.Predicates.at('document.type', 'projet'), {
        orderings: '[my.projet.date desc]'
      })
      .then(function(response) {
        // response is the response object, response.results holds the documents
        projects = response.results;
        console.log(projects);
      });

    // preview.description = result.data.description[0].text;
    // preview.title = result.data.title[0].text;

    return { projects };
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

.links {
  padding-top: 15px;
}
</style>
