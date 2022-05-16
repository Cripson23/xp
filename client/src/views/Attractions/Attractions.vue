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
      @addObjectClicked="toggleAdding"
    ></Actions>
    <Popup v-if="isAddObjectPopupOpened" @closePopup="closePopup">
      <template #title>{{ getFormTitle }}</template>
      <template #content>
        <AddObjectForm
          @submit="handleCreateObject"
          @edit="onEditFeature"
          :feature="featureEditing"
        ></AddObjectForm>
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

export default {
  name: "Attractions",

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
      isAddImagePopupOpened: false,
      featureEditing: null,
    };
  },

  methods: {
    ...mapActions("features", [
      "fetchFeatures",
      "createFeature",
      "deleteFeature",
      "editFeature",
    ]),

    openDetails(feature) {
      this.featureSelected = feature;
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

    toggleAdding() {
      this.isAddingObject = !this.isAddingObject;
    },

    closePopup() {
      this.isAddObjectPopupOpened = false;
      this.isAddingObject = false;
      this.coords = null;
      this.featureEditing = null;
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

    async handleEditFeature(feature) {
      this.featureEditing = feature;
      this.isAddObjectPopupOpened = true;
    },

    async onEditFeature(formData) {
      await this.editFeature({
        id: this.featureEditing.id,
        data: Object.fromEntries(formData.entries()),
      });
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
          text: this.addObjectText,
          clickEventName: "addObjectClicked",
        },
      ];
    },

    addObjectText() {
      if (!this.isAddingObject) {
        return "Добавить объект";
      }

      return "Кликните по карте для выбора точки, или сюда, чтобы прекратить добавление";
    },

    getFormTitle() {
      if (!this.featureEditing) {
        return "Добавить объект";
      }

      return "Изменить объект";
    },
  },

  async mounted() {
    await this.fetchFeatures();
  },
};
</script>

<style lang="scss" src="./style.scss"></style>
