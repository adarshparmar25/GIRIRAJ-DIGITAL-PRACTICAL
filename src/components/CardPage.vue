<template>
  <v-container>
    <v-card class="pa-6 bg-grey-lighten-5 elevation-6 my-5">
      <HeaderTabs />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderTabs from "./HeaderTabs.vue";

export default defineComponent({
  name: "App",
  components: {
    HeaderTabs,
  },
});
</script>
