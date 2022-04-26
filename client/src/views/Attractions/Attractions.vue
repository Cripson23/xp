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
          :add-images-allowed="isLoggedIn"
          :delete-allowed="isModerator"
          :edit-allowed="isModerator"
          :feature="featureSelected"
          @addImage="openAddImagePopup"
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

    <Popup v-if="isAddImagePopupOpened" @closePopup="closeAddImagePopup">
      <template #title>Добавить картинку</template>
      <template #content>
        <AddImageForm @submit="handleAddImage"></AddImageForm>
      </template>
    </Popup>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Map from "../../components/Map/Map";
import FeatureDetails from "../../components/FeatureDetails/FeatureDetails";
import Actions from "../../components/Actions/Actions";
import Popup from "../../components/UI/Popup/Popup";
import AddObjectForm from "../../components/AddObjectForm/AddObjectForm";
import AddImageForm from "../../components/AddImageForm/AddImageForm";

export default {
  name: "Attractions",

  components: {
    Map,
    FeatureDetails,
    Actions,
    Popup,
    AddObjectForm,
    AddImageForm,
  },

  data() {
    return {
      featureSelected: null,
      isAddObjectPopupOpened: false,
      isAddingObject: false,
      coords: null,
      isAddImagePopupOpened: false,
    };
  },

  methods: {
    ...mapActions("features", [
      "fetchFeatures",
      "createFeature",
      "deleteFeature",
      "addImage",
    ]),

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
      data.append("xObject", this.coords.xObject);
      data.append("yObject", this.coords.yObject);
      await this.createFeature(Object.fromEntries(data.entries()));
      this.closePopup();
    },

    async handleDeleteFeature({ id }) {
      await this.deleteFeature(id);
      this.closeDetails();
    },

    openAddImagePopup() {
      this.isAddImagePopupOpened = true;
    },

    closeAddImagePopup() {
      this.isAddImagePopupOpened = false;
    },

    async handleAddImage(formData) {
      await this.addImage({
        id: this.featureSelected.id,
        formData,
      });
    },

    async handleEditFeature() {
      // console.log(feature);
      // console.log('feature: ', JSON.parse(JSON.stringify(feature)));
    },
  },

  computed: {
    ...mapGetters("features", ["getFeatures"]),
    ...mapGetters("user", ["isModerator", "isLoggedIn"]),

    getMapFeatures() {
      return this.getFeatures;
    },

    getActions() {
      return [
        {
          text: "Добавить объект",
          clickEventName: "addObjectClicked",
        },
      ];
    },
  },

  async mounted() {
    await this.fetchFeatures();
  },
};
</script>

<style lang="scss" src="./style.scss"></style>
