<template>
  <footer class="footer">
    <div class="container">
      <div class="wrapper-txt">
        <span v-for="(footerTxt, index) in layout.footer_content" :key="index">
          {{ footerTxt.text }}
        </span>
      </div>
    </div>
  </footer>
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
.wrapper-txt {
    display: flex;
    justify-content: flex-end;
    color: $primary-light;
    line-height: 2rem;
    > span {
        margin-left: 25px;
    }
}
@media (max-width: $desktop-small) {
    .footer {
        margin-top: 20px;
    }
}
</style>
