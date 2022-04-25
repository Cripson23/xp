<template>
  <section class="attractions">
    <div class="attractions-container attractions-container--map">
      <Map
          :features="getMapFeatures"
          :is-click-emit-required="isAddingObject"
          @detailsClicked="openDetails"
          @mapClicked="handleMapClick"
      />
    </div>

    <transition name="slide-fade">
      <div v-if="featureSelected" class="feature-details__container">
        <FeatureDetails
            :delete-allowed="isDeleteAllowed"
            :edit-allowed="isEditAllowed"
            :feature="featureSelected"
            @closeDetails="closeDetails"
            @deleteFeature="handleDeleteFeature"
            @editFeature="handleEditFeature"
        />
      </div>
    </transition>

    <Actions
        v-if="isLoggedIn"
        :actions="getActions"
        class="attractions__actions"
        @addObjectClicked="setAddingObjectProcess"
    ></Actions>
    <Popup v-if="isAddObjectPopupOpened" @closePopup="closePopup">
      <template #title>Добавить объект</template>
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
      featureSelected: null,
      isAddObjectPopupOpened: false,
      isAddingObject: false,
      coords: null,
    };
  },

  methods: {
    ...mapActions('features', ['fetchFeatures', 'createFeature', 'deleteFeature']),

    openDetails(feature) {
      this.featureSelected = feature;
    },

    setAddingObjectProcess() {
      this.isAddingObject = !this.isAddingObject;
    },

    handleMapClick(coords) {
      this.coords = coords;
      this.openAddObjectPopup();
    },

    closeDetails() {
      this.featureSelected = null;
    },

    openAddObjectPopup() {
      this.isAddObjectPopupOpened = true;
      this.isAddingObject = false;
    },

    closePopup() {
      this.isAddObjectPopupOpened = false;
      this.coords = null;
    },

    async handleCreateObject(data) {
      let images = new FormData();

      images.append('file', data.get('file'));
      images.append('year', data.get('year'));
      data.delete('file');
      data.delete('year');
      data.append('xObject', this.coords.xObject);
      data.append('yObject', this.coords.yObject);
      await this.createFeature({
        featureData: Object.fromEntries(data.entries()),
        images,
      });

      this.closePopup();
    },

    async handleDeleteFeature({id}) {
      await this.deleteFeature(id);
      this.closeDetails();
    },

    async handleEditFeature() {
      // console.log(feature);
      // console.log('feature: ', JSON.parse(JSON.stringify(feature)));

    },
  },

  computed: {
    ...mapGetters('features', ['getFeatures']),
    ...mapGetters('user', ['isModerator', 'isLoggedIn']),

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

    isDeleteAllowed() {
      return this.isModerator;
    },

    isEditAllowed() {
      return this.isModerator;
    },
  },

  async mounted() {
    await this.fetchFeatures();
  },
};
</script>

<style lang="scss" src="./style.scss">

</style>
