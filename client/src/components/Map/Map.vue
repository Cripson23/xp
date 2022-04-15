<template>
  <div id="map"/>
</template>

<script>
import {Map, Marker, Popup} from 'maplibre-gl';
import {createElement} from '../../utils';

// ЭТО НЕБЕЗОПАСНО (с), но в энв файлы тупо лень выносить
const API_KEY = 'hWQhKrQw4Ec9RBKVMtoJ';
const SHLEPA_IMG_LINK = 'https://www.meme-arsenal.com/memes/9de9299d40f76bcc4d9bc825b7a89590.jpg';
export default {
  name: 'Map',
  props: {
    features: {
      type: Array,
      required: true,
    },
  },

  mounted() {
    this.mapInit();
  },

  methods: {
    mapInit() {
      this.map = new Map({
        container: 'map',
        style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
        center: [56.22651431884615, 58.00999061270135],
        minZoom: 7,
        zoom: 10,
        fadeDuration: 100,
        attributionControl: false,
        maplibreLogo: false,
        antialias: true,
        renderWorldCopies: false,
      });
      this.map.on('load', this.mapLoaded);
    },

    mapLoaded() {
      this.fillFeatures();
    },

    fillFeatures() {
      this.features.forEach(feature => {
        let popup = new Popup({offset: 25});
        popup.setDOMContent(this.getPopupElement(feature));
        let marker = createElement({classList: ['marker']});
        marker.style.backgroundImage = `url(${SHLEPA_IMG_LINK})`;
        marker.addEventListener('click', () => this.$emit('featureClicked', feature));
        new Marker(marker).setLngLat([feature.yObject, feature.xObject]).addTo(this.map).setPopup(popup);
      });
    },

    openDetails(feature) {
      this.$emit('detailsClicked', feature);
    },

    getPopupElement(feature) {
      let wrapper = createElement({tag: 'div', classList: ['list-view--horizontal', 'flex']});
      let btn = createElement({tag: 'button'});
      btn.innerText = 'Подробнее';
      wrapper.innerHTML = `<h1>${feature.name}</h1><span>${feature.descriptionObject}</span>`;
      btn.addEventListener('click', this.openDetails.bind(this, feature));
      wrapper.appendChild(btn);
      return wrapper;
    }
  },
};
</script>

<style lang="scss" src="./style.scss">

</style>
