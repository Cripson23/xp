<template>
  <aside class="feature-details">
    <div class="feature-details__header">
      <div class="feature-details__name">
        <h1>{{feature.name}}</h1>
      </div>

      <UButton class="feature-details__close" @click="$emit('closeDetails')" rounded hover :width="25" :height="25">
        <fa-icon icon="fa-solid fa-xmark" />
      </UButton>
    </div>

    <div class="feature-details__body">
      {{feature.descriptionObject}}
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
