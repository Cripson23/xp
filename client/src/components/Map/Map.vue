<template>
  <div id="map" />
</template>

<script>
import { Map, Marker, Popup } from "maplibre-gl";
import { createElement } from "../../utils";

// ЭТО НЕБЕЗОПАСНО (с), но в энв файлы тупо лень выносить
const API_KEY = "hWQhKrQw4Ec9RBKVMtoJ";
const SHLEPA_IMG_LINK =
  "https://memepedia.ru/wp-content/uploads/2020/10/big-floppa-meme.png";
export default {
  name: "Map",
  props: {
    features: {
      type: Array,
      required: true,
    },
    isClickEmitRequired: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  mounted() {
    this.mapInit();
  },

  data() {
    return {
      markers: [],
    };
  },

  methods: {
    mapInit() {
      this.map = new Map({
        container: "map",
        style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
        center: [56.22651431884615, 58.00999061270135],
        minZoom: 7,
        zoom: 10,
        maplibreLogo: false,
      });
      this.map.on("click", this.emitMapClick);
    },

    fillFeatures() {
      this.features.forEach((feature) => {
        let popup = new Popup({ offset: 25 });
        popup.setDOMContent(this.getPopupElement(feature));
        let marker = createElement({ classList: ["marker"] });
        marker.style.backgroundImage = `url(${SHLEPA_IMG_LINK})`;
        marker.addEventListener("click", () =>
          this.$emit("featureClicked", feature)
        );
        new Marker(marker)
          .setLngLat([feature.yObject, feature.xObject])
          .addTo(this.map)
          .setPopup(popup);
        this.markers.push(marker);
      });
    },

    openDetails(feature) {
      this.$emit("detailsClicked", feature);
    },

    getPopupElement(feature) {
      let wrapper = createElement({
        tag: "div",
        classList: ["list-view--vertical", "flex"],
      });
      let btn = createElement({
        tag: "button",
        classList: ["map__balloon-button"],
      });
      btn.innerText = "Подробнее";
      wrapper.innerHTML = `<span>${feature.name}</span>`;
      btn.addEventListener("click", this.openDetails.bind(this, feature));
      wrapper.appendChild(btn);
      return wrapper;
    },

    updateMarkers() {
      this.markers.forEach((marker) => {
        marker.remove();
      });
      this.fillFeatures();
    },

    emitMapClick(event) {
      if (!this.isClickEmitRequired) {
        return;
      }

      this.$emit("mapClicked", {
        xObject: event.lngLat.lat,
        yObject: event.lngLat.lng,
      });
    },
  },

  watch: {
    features: function () {
      this.updateMarkers();
    },
  },
};
</script>

<style lang="scss" src="./style.scss"></style>
