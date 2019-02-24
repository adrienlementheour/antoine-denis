<template>
  <header class="header">
    <div class="container">
      <div class="infos">
        <h1 v-if="layout.site_title.length == 1" class="name"><a href="./">{{ layout.site_title[0].text }}</a></h1>
        <div class="about-content">
          <h2 v-if="layout.description.length == 1" class="job">{{ layout.description[0].text }}</h2>
          <div v-if="layout.email" class="mail">{{ layout.email_text }}</div>
          <div v-if="layout.other_links.length" class="more-links">
            <a v-for="(link, linkIndex) in layout.other_links" :key="linkIndex" :href="link.other_link.url" class="link">{{ link.other_link_text }}</a>
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
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 190px;
        background: $gradient;
        z-index: -1;
        pointer-events: none;
    }
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
    margin-top: 5px;
}
.mail {
    display: inline-block;
    margin-top: 20px;
    color: $primary-light;
}
.more-links {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 20px;
    > a {
        color: $primary-light;
        margin-right: 20px;
        &:last-child {
            margin-right: 0;
        }
    }
}
.logo {
    flex: 0 0 auto;
    width: 35px;
    height: 55px;
    margin: -9px 0 0;
    color: $secondary;
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
</style>
