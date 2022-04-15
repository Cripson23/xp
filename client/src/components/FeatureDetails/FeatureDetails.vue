<template>
  <aside class="feature-details">
    <div class="feature-details__header">
      <div class="feature-details__name">
        {{feature.name}}
      </div>

      <UButton class="feature-details__close" @click="$emit('closeDetails')" rounded hover>
        X
      </UButton>
    </div>
  </aside>
</template>

<script>
import UButton from '../UI/UButton/UButton';

export default {
  name: 'FeatureDetails',
  props: {
    feature: {
      type: Object,
      required: true,
    }
  },

  components: {
    UButton
  },

  mounted() {
    console.log('this.feature: ', JSON.parse(JSON.stringify(this.feature)));

  }
};
</script>

<style src="./style.scss" lang="scss">

</style>
