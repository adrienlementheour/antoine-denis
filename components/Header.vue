<template>
  <header class="header">
    <div class="container">
      <div class="infos">
        <h1 v-if="layout.site_title.length == 1" class="name"><a href="./">{{ layout.site_title[0].text }}</a></h1>
        <div class="about-content">
          <h2 v-if="layout.description.length == 1" class="job">{{ layout.description[0].text }}</h2>
          <a v-if="layout.email" :href="layout.email.url" class="mail">{{ layout.email_text }}</a>
          <div v-if="layout.other_links.length" class="more-links">
              <div v-for="(link, linkIndex) in layout.other_links" :key="linkIndex">
                  <a v-if="link.other_link.target === '_blank'" target="_blank" rel="noopener noreferrer" :href="link.other_link.url" class="link">{{ link.other_link_text }}</a>
                  <a v-else :href="link.other_link.url" class="link">{{ link.other_link_text }}</a>
              </div>
          </div>
        </div>
      </div>
      <div class="wrapper-about">
        <a href="./" class="logo">
            <svg class="icon icon-logo"><use xlink:href="#icon-logo" /></svg>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
    data() {
        return {
            showAbout: false
        };
    },
    computed: {
        layout() {
            return this.$store.state.layout;
        }
    }
};
</script>

<style scoped lang='scss'>
.header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 20px 0 0 0;
    color: $secondary-light;
    z-index: 2;
    .container {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }
}
.name,
.job {
    font-size: 1.5rem;
    margin: 0;
    font-weight: normal;
}
.job {
    margin-top: 2px;
}
.mail {
    display: inline-block;
    margin-top: 22px;
    color: $primary-light;
}
.more-links {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 20px;
    > div {
        margin-right: 20px;
        &:last-child {
            margin-right: 0;
        }
    }
    a {
        color: $primary-light;
    }
}
.logo {
    display: none;
    flex: 0 0 auto;
    width: 26px;
    height: 42px;
    margin: -7px -7px 0 0;
    color: $secondary-light;
    .icon {
        width: 100%;
        height: 100%;
    }
}
.wrapper-about {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
}

@media (max-width: $desktop-small) {
    .header {
        padding-top: 10px;
    }
    .logo {
        margin: -5px -5px 0 0;
    }
}
</style>
