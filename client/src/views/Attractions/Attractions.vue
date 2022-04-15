<template>
  <section class="attractions">
    <div class="attractions-container attractions-container--list">
      <List :items="items" direction="vertical"/>
    </div>
    <div class="attractions-container attractions-container--map">
      <Map :features="getMapFeatures" @detailsClicked="openDetails"/>
    </div>

    <transition name="slide-fade">
      <div v-if="featureSelected" class="feature-details__container">
        <FeatureDetails :feature="featureSelected" @closeDetails="closeDetails"/>
      </div>
    </transition>
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Map from '../../components/Map/Map';
import List from '../../components/List/List';
import FeatureDetails from '../../components/FeatureDetails/FeatureDetails';


export default {
  name: 'Attractions',

  components: {
    Map,
    List,
    FeatureDetails,
  },

  data() {
    return {
      items: [
        {
          id: 1,
          name: 111,
        },
      ],
      featureSelected: null,
    };
  },

  methods: {
    ...mapActions('pois', ['getAllPOIs']),

    openDetails(feature) {
      this.featureSelected = feature;
    },

    closeDetails() {
      this.featureSelected = null;
    }
  },

  computed: {
    ...mapGetters('pois', ['getPOIs']),

    getMapFeatures() {
      return this.getPOIs;
    },
  },

  async mounted() {
    await this.getAllPOIs();
  },
};
</script>

<style lang="scss" src="./style.scss">

</style>
