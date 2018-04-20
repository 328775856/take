<template>
  <div class="c-navigation">
    <div class="flex-row">
      <div class="flex-item">
        <div class="nav-item flex-col">
          <i class="nav-icon">icon</i>
          <span class="nav-text">foo</span>
        </div>
      </div>
      <div class="flex-item">
        <div class="nav-item flex-col">
          <i class="nav-icon flex-item">icon</i>
          <span class="nav-text flex-item">foo</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'navigation'
  }
</script>

<style scoped>
  .c-navigation {
    position: fixed;
    bottom: 0;
    height: 1rem;
    width: 100%;
    background: #aaa;
  }

</style>
