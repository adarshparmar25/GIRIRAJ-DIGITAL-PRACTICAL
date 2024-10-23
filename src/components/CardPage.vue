<template>
  <v-container>
    <v-card class="pa-6 bg-grey-lighten-5 elevation-6 my-5">
      <HeaderTabs />
      <v-row>
        <v-col cols="12" md="3" class="mt-4">
          <SidePanel />
        </v-col>
        <v-col cols="12" md="9">
          <CardsCarousel />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderTabs from "./HeaderTabs.vue";
import SidePanel from "./SidePanel.vue";
import CardsCarousel from "./CardsCarousel.vue";

export default defineComponent({
  name: "App",
  components: {
    HeaderTabs,
    SidePanel,
    CardsCarousel,
  },
});
</script>
