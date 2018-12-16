<template>
  <header class="header">
    <div class="container large">
      <div class="infos">
        <h1 v-if="layout.site_title.length == 1" class="name"><a href="./">{{ layout.site_title[0].text }}</a></h1>
        <div v-show="showAbout" class="about-content">
          <h2 v-if="layout.description.length == 1" class="job">{{ layout.description[0].text }}</h2>
          <a v-if="layout.email" :href="layout.email.url" class="mail">{{ layout.email_text }}</a>
          <div class="more-links">
            <a v-for="(link, linkIndex) in layout.other_links" :key="linkIndex" :href="link.other_link.url" class="link">{{ link.other_link_text }}</a>
          </div>
        </div>
      </div>
      <a href="./" class="logo">
        <svg class="icon icon-logo"><use xlink:href="#icon-logo" /></svg>
      </a>
      <div class="wrapper-about">
        <a href="#" @click.stop.prevent="handleAbout">{{ layout.about_text }}</a>
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
    },
    methods: {
        handleAbout() {
            this.showAbout = !this.showAbout;
        }
    }
};
</script>

<style scoped lang='scss'>
.header {
    position: relative;
    margin: 0 0 145px;
    padding: 20px 0 0 0;
    color: $secondary-light;
    z-index: 2;
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 270px;
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
.infos,
.wrapper-about {
    width: calc(50% - 39px);
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
    width: 78px;
    height: 125px;
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

@media (max-width: $phone) {
    .header {
        .container {
            flex-wrap: wrap;
            justify-content: center;
        }
    }
    .infos,
    .wrapper-about {
        width: 50%;
    }
    .infos {
        order: 1;
    }
    .logo {
        order: 3;
        margin-top: 20px;
    }
    .wrapper-about {
        order: 2;
    }
}
</style>
