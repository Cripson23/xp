<template>
  <section class="attractions">
    <div class="attractions-container attractions-container--map">
      <Map :features="getMapFeatures" @detailsClicked="openDetails"/>
    </div>

    <transition name="slide-fade">
      <div v-if="featureSelected" class="feature-details__container">
        <FeatureDetails :feature="featureSelected" @closeDetails="closeDetails"/>
      </div>
    </transition>

    <Actions :actions="getActions" @addObjectClicked="openAddObjectPopup"></Actions>
    <Popup v-if="isAddObjectPopupOpened" @closePopup="closePopup">
      <template #content>
        <AddObjectForm @submit="handleCreateObject"></AddObjectForm>
      </template>
    </Popup>
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Map from '../../components/Map/Map';
import FeatureDetails from '../../components/FeatureDetails/FeatureDetails';
import Actions from '../../components/Actions/Actions';
import Popup from '../../components/UI/Popup/Popup';
import AddObjectForm from '../../components/AddObjectForm/AddObjectForm';


export default {
  name: 'Attractions',

  components: {
    Map,
    FeatureDetails,
    Actions,
    Popup,
    AddObjectForm,
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
      isAddObjectPopupOpened: false,
    };
  },

  methods: {
    ...mapActions('features', ['fetchFeatures', 'createFeature']),

    openDetails(feature) {
      this.featureSelected = feature;
    },

    closeDetails() {
      this.featureSelected = null;
    },

    openAddObjectPopup() {
      this.isAddObjectPopupOpened = true;
    },
    closePopup() {
      this.isAddObjectPopupOpened = false;
    },

    async handleCreateObject(data) {
      let newFeatureData = Object.fromEntries(data.entries());
      await this.createFeature(newFeatureData)
    },
  },

  computed: {
    ...mapGetters('features', ['getFeatures']),

    getMapFeatures() {
      return this.getFeatures;
    },

    getActions() {
      return [
        {
          text: 'Добавить объект',
          clickEventName: 'addObjectClicked',
        }];
    },
  },

  async mounted() {
    await this.fetchFeatures();
  },
};
</script>

<style lang="scss" src="./style.scss">

</style>
