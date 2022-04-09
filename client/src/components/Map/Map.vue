<template>
  <div id="map">
  </div>
</template>

<script>
import {GeolocateControl, Map, NavigationControl} from 'maplibre-gl';

// ЭТО НЕБЕЗОПАСНО (с), но в энв файлы тупо лень выносить
const API_KEY = 'hWQhKrQw4Ec9RBKVMtoJ';
export default {
  name: 'Map',

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
        zoom: 12,
        fadeDuration: 100,
        attributionControl: false,
        maplibreLogo: false,
        antialias: true,
        renderWorldCopies: false,
      });
      this.addControls();
      // this.map.on('load', this.mapLoaded)
    },
    addControls() {
      this.map.addControl(new NavigationControl({}), 'bottom-right');
      this.map.addControl(
          new GeolocateControl({
            positionOptions: {enableHighAccuracy: true},
            trackUserLocation: false,
          }),
          'bottom-right',
      );
      // this.map.addControl(new PropertyFiltersMapControl(this.$store))
      // this.map.addControl(new SchoolFilterMapControl(this.$store, this.openSchoolsFilterFn), 'top-left')
      // this.map.addControl(new SchoolZoneLayersMapControl(this.$store, this.toggleLayer), 'top-left')
      // this.map.addControl(new SchoolLegendMapControl(), 'bottom-left')
    },
  },
};
</script>

<style lang="scss" src="./style.scss">

</style>
