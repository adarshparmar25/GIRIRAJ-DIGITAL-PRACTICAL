<template>
  <v-row>
    <v-col>
      <v-tabs v-model="activeTab" background-color="transparent">
        <v-tab :class="getTabClass(0)"> Saved Cards </v-tab>
        <v-tab :class="getTabClass(1)"> GD Cards </v-tab>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "HeaderTabs",

  setup() {
    const isDialogOpen = ref(false);
    const activeTab = ref(0);

    const getTabClass = (index: number) => {
      return activeTab.value === index ? "text-blue" : "text-black";
    };

    return {
      isDialogOpen,
      activeTab,
      getTabClass,
    };
  },
});
</script>

<style scoped>
.text-blue {
  color: #1976d2 !important;
}

.text-black {
  color: black !important;
}
</style>
