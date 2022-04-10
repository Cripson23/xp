<template>
  <section class="attractions">
    <div class="attractions-container attractions-container--list">
      <List :items="items" direction="vertical"/>
    </div>
    <div class="attractions-container attractions-container--map">
      <Map :features="getMapFeatures"/>
    </div>

  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Map from '../../components/Map/Map';
import List from '../../components/List/List';


export default {
  name: 'Attractions',

  components: {
    Map,
    List,
  },

  data() {
    return {
      items: [
        {
          id: 1,
          name: 111,
        },
      ],
    };
  },

  methods: {
    ...mapActions('pois', ['getAllPOIs']),
  },

  computed: {
    ...mapGetters("pois", ["getPOIs"]),

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
