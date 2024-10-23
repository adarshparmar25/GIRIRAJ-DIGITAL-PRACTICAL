<template>
  <v-row>
    <v-col>
      <v-tabs v-model="activeTab" background-color="transparent">
        <v-tab :class="getTabClass(0)"> Saved Cards </v-tab>
        <v-tab :class="getTabClass(1)"> GD Cards </v-tab>
      </v-tabs>
    </v-col>

    <v-col class="text-right">
      <v-btn color="primary" @click="isDialogOpen = true">+ Add Card</v-btn>
      <AddCardDialog
        :isDialogOpen="isDialogOpen"
        :existingCards="cards"
        @close="isDialogOpen = false"
        @addCard="handleAddCard"
      />
    </v-col>

    <ToastContainer />
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AddCardDialog from "./AddCardDialog.vue";
import { useCardStore } from "@/store/index";
import type { Card } from "@/store/index";

export default defineComponent({
  name: "HeaderTabs",
  components: {
    AddCardDialog,
  },
  setup() {
    const cardStore = useCardStore();
    const isDialogOpen = ref(false);
    const activeTab = ref(0);

    const handleAddCard = (newCardDetails: Card) => {
      cardStore.addCard(newCardDetails);
    };

    const getTabClass = (index: number) => {
      return activeTab.value === index ? "text-blue" : "text-black";
    };

    return {
      isDialogOpen,
      handleAddCard,
      cards: cardStore.cards,
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
