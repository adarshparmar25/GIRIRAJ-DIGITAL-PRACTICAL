<template>
  <v-container>
    <h3 class="section-title text-primary">Credit Cards</h3>
    <v-row>
      <v-col>
        <v-carousel show-arrows="hover" hide-delimiter-background>
          <v-carousel-item
            v-for="(card, index) in sortedCreditCards"
            :key="index"
          >
            <v-row>
              <v-col cols="8">
                <v-row justify="end" class="my-2">
                  <v-btn
                    outlined
                    color="blue-lighten-4"
                    class="show-card-btn"
                    @click="toggleShowCard(card.id)"
                  >
                    <v-icon left class="mr-2">mdi-eye-outline</v-icon>
                    {{
                      card.showNumber ? "Hide Card Number" : "Show Card Number"
                    }}
                  </v-btn>
                </v-row>
                <v-card
                  :class="[
                    'credit-card',
                    card.archived || card.locked ? 'disabled-card' : '',
                  ]"
                >
                  <div class="icon-container">
                    <v-icon v-if="card.default" class="top-icon">
                      mdi-check
                    </v-icon>
                    <v-icon v-if="card.archived" class="disabled-icon">
                      mdi-archive-outline
                    </v-icon>
                    <v-icon v-if="card.locked" class="disabled-icon">
                      mdi-lock-outline
                    </v-icon>
                    <v-img
                      v-if="card.addToGPay"
                      src="assets/google-pay.svg"
                      alt="Google Pay"
                      class="gpay-icon"
                    />
                  </div>

                  <div style="position: absolute; top: 15px; right: 20px">
                    <img
                      src="assets/hdfc-bank-logo.svg"
                      alt="HDFC Bank"
                      style="max-width: 150px"
                    />
                  </div>

                  <div class="card-holder-name mt-16">
                    {{ card.name || "John Watson" }}
                  </div>

                  <div class="card-number">
                    {{
                      card.showNumber
                        ? card.cardNumber
                        : "•••• •••• •••• " + card.cardNumber.slice(-4) ||
                          "•••• •••• •••• 9340"
                    }}
                  </div>

                  <div class="card-details">
                    <span>Valid Till: {{ card.validTill || "12/24" }}</span>
                    <span>CVV: {{ card.showNumber ? card.cvv : "•••" }}</span>
                  </div>

                  <div style="position: absolute; bottom: 25px; right: 20px">
                    <img
                      src="assets/mastercard-logo.svg"
                      alt="Mastercard"
                      style="width: 80px; height: auto"
                    />
                  </div>
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-16">
                <v-card class="actions-card" flat>
                  <v-row>
                    <v-col cols="6" class="text-center">
                      <v-btn
                        @click="lockCard(card.id)"
                        color="primary"
                        icon
                        rounded
                        size="large"
                        class="rounded-circle"
                      >
                        <v-icon>mdi-lock-outline</v-icon>
                      </v-btn>
                      <div class="action-label">
                        {{ card.locked ? "Unlock Card" : "Lock Card" }}
                      </div>
                    </v-col>

                    <v-col cols="6" class="text-center">
                      <v-btn
                        @click="archiveCard(card.id)"
                        color="primary"
                        rounded
                        icon
                        size="large"
                        class="rounded-circle"
                      >
                        <v-icon>mdi-archive-outline</v-icon>
                      </v-btn>
                      <div class="action-label">
                        {{ card.archived ? "Unarchive" : "Archive" }}
                      </div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6" class="text-center">
                      <v-btn
                        :disabled="card.default"
                        @click="setAsDefault(card.id)"
                        color="primary"
                        icon
                        rounded
                        size="large"
                        class="rounded-circle"
                      >
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                      <div class="action-label">Set As Default</div>
                    </v-col>

                    <v-col cols="6" class="text-center">
                      <v-btn
                        @click="toggleGPay(card.id)"
                        color="primary"
                        icon
                        rounded
                        size="large"
                        class="rounded-circle"
                      >
                        <v-img
                          src="assets/g-pay-rounded.svg"
                          alt="Google Pay"
                          style="height: 50px; width: 50px"
                        />
                      </v-btn>
                      <div class="action-label">
                        {{
                          card.addToGPay ? "Remove from GPay" : "Add to GPay"
                        }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <h3 class="section-title text-primary">Debit Cards</h3>
    <v-row>
      <v-col>
        <v-carousel show-arrows="hover" hide-delimiter-background>
          <v-carousel-item
            v-for="(card, index) in sortedDebitCards"
            :key="index"
          >
            <v-row>
              <v-col cols="8">
                <v-row justify="end" class="my-2">
                  <v-btn
                    variant="flat"
                    color="blue-lighten-4"
                    class="show-card-btn"
                    @click="toggleShowCard(card.id)"
                  >
                    <v-icon left class="mr-2">mdi-eye-outline</v-icon>
                    {{
                      card.showNumber ? "Hide Card Number" : "Show Card Number"
                    }}
                  </v-btn>
                </v-row>
                <v-card
                  :class="[
                    'credit-card',
                    card.archived || card.locked ? 'disabled-card' : '',
                  ]"
                >
                  <div class="icon-container">
                    <v-icon v-if="card.default" class="top-icon">
                      mdi-check
                    </v-icon>
                    <v-icon v-if="card.archived" class="disabled-icon">
                      mdi-archive-outline
                    </v-icon>
                    <v-icon v-if="card.locked" class="disabled-icon">
                      mdi-lock-outline
                    </v-icon>
                    <v-img
                      v-if="card.addToGPay"
                      src="assets/google-pay.svg"
                      alt="Google Pay"
                      class="gpay-icon"
                    />
                  </div>

                  <div style="position: absolute; top: 15px; right: 20px">
                    <img
                      src="assets/hdfc-bank-logo.svg"
                      alt="HDFC Bank"
                      style="max-width: 150px"
                    />
                  </div>

                  <v-row>
                    <v-col>
                      <div class="card-holder-name mt-16">
                        {{ card.name }}
                      </div>

                      <div class="card-number">
                        {{
                          card.showNumber
                            ? card.cardNumber
                            : "•••• •••• •••• " + card.cardNumber.slice(-4)
                        }}
                      </div>
                      <div class="card-details">
                        <span>Valid Till: {{ card.validTill }}</span>
                        <span
                          >CVV: {{ card.showNumber ? card.cvv : "•••" }}</span
                        >
                      </div>
                      <div
                        style="position: absolute; bottom: 25px; right: 20px"
                      >
                        <img
                          src="assets/mastercard-logo.svg"
                          alt="Mastercard"
                          style="width: 80px; height: auto"
                        />
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-16">
                <v-card class="actions-card" flat>
                  <v-row>
                    <v-col cols="6" class="text-center">
                      <v-btn
                        @click="lockCard(card.id)"
                        color="primary"
                        icon
                        rounded
                        size="large"
                        class="rounded-circle"
                      >
                        <v-icon>mdi-lock-outline</v-icon>
                      </v-btn>
                      <div class="action-label">
                        {{ card.locked ? "Unlock Card" : "Lock Card" }}
                      </div>
                    </v-col>

                    <v-col cols="6" class="text-center">
                      <v-btn
                        @click="archiveCard(card.id)"
                        color="primary"
                        rounded
                        icon
                        size="large"
                        class="rounded-circle"
                      >
                        <v-icon>mdi-archive-outline</v-icon>
                      </v-btn>
                      <div class="action-label">
                        {{ card.archived ? "Unarchive" : "Archive" }}
                      </div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6" class="text-center">
                      <v-btn
                        :disabled="card.default"
                        @click="setAsDefault(card.id)"
                        color="primary"
                        icon
                        rounded
                        size="large"
                        class="rounded-circle"
                      >
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                      <div class="action-label">Set As Default</div>
                    </v-col>

                    <v-col cols="6" class="text-center">
                      <v-btn
                        color="primary"
                        @click="toggleGPay(card.id)"
                        icon
                        rounded
                        size="large"
                        class="rounded-circle"
                      >
                        <v-img
                          src="assets/g-pay-rounded.svg"
                          alt="Google Pay"
                          style="height: 50px; width: 50px"
                        />
                      </v-btn>
                      <div class="action-label">
                        {{
                          card.addToGPay ? "Remove from GPay" : "Add to GPay"
                        }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useCardStore } from "@/store/index";
import { toast, type ToastOptions } from "vue3-toastify";

export default defineComponent({
  name: "CardCarousel",
  setup() {
    const cardStore = useCardStore();

    const sortedCreditCards = computed(() => cardStore.sortedCreditCards);
    const sortedDebitCards = computed(() => cardStore.sortedDebitCards);

    const findCardById = (id: string) =>
      cardStore.cards.find((card) => card.id === id);

    const updateCardState = (
      cardId: string,
      updates: Partial<(typeof cardStore.cards)[0]>
    ) => {
      const card = findCardById(cardId);
      if (!card)
        return toast.error("Card not found", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        } as ToastOptions);
      cardStore.updateCard(cardId, updates);
    };

    const toggleShowCard = (cardId: string) => {
      const card = findCardById(cardId);
      if (card) updateCardState(cardId, { showNumber: !card.showNumber });
    };

    const archiveCard = (cardId: string) => {
      const card = findCardById(cardId);
      if (card)
        updateCardState(cardId, {
          archived: !card.archived,
          default: false,
          addToGPay: false,
        });
    };

    const lockCard = (cardId: string) =>
      updateCardState(cardId, { locked: !findCardById(cardId)?.locked });

    const setAsDefault = (cardId: string) => {
      const card = findCardById(cardId);
      if (!card) return;

      if (card.archived) {
        toast.error("This card is archived so you cannot set it as default", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        } as ToastOptions);
        return;
      }

      cardStore.cards.forEach((c) => {
        if (c.cardType === card.cardType && c.default) {
          cardStore.updateCard(c.id, { default: false });
        }
      });

      updateCardState(cardId, { default: true });
    };

    const toggleGPay = (cardId: string) => {
      const card = findCardById(cardId);
      if (!card) return;

      if (card.archived) {
        toast.error(
          "This card is archived so you cannot add it to Google Pay",
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          } as ToastOptions
        );
        return;
      }

      updateCardState(cardId, { addToGPay: !card.addToGPay });
    };

    return {
      sortedCreditCards,
      sortedDebitCards,
      toggleShowCard,
      archiveCard,
      lockCard,
      setAsDefault,
      toggleGPay,
    };
  },
});
</script>

<style scoped>
.section-title {
  margin-top: 30px;
  font-size: 1.5rem;
  font-weight: bold;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 80%;
  height: 2px;
  background-color: #00a4e4;
}

.credit-card {
  background-color: #0f477e;
  color: white;
  position: relative;
  padding: 20px;
  height: 100%;
  border-radius: 15px;
  transition: background-color 0.3s;
}

.card-holder-name,
.card-number {
  font-family: "Courier New", Courier, monospace;
}

.card-holder-name {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.card-number {
  font-size: 1.4rem;
  letter-spacing: 3px;
  margin-bottom: 20px;
  font-weight: bold;
}

.show-card-btn {
  text-transform: capitalize;
  font-weight: 400;
  margin-right: 10px;
}

.actions-card {
  padding: 16px;
  background-color: #c1e6ff;
  border-radius: 8px;
}

.action-label {
  margin-top: 8px;
  font-size: 14px;
  text-align: center;
}

.card-details {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  position: absolute;
  bottom: 25px;
  left: 20px;
  right: 140px;
}

.disabled-card {
  opacity: 0.6;
  background-color: #e0e0e0;
  color: #1e3354;
}

.icon-container {
  display: flex;
  align-items: center;
  position: absolute;
  top: 15px;
  left: 20px;
}

.top-icon,
.disabled-icon {
  margin-right: 10px;
  font-size: 24px;
}

.top-icon {
  color: white;
}

.disabled-icon {
  color: #1e3354;
}

.gpay-icon {
  width: 50px;
  height: 50px;
  margin-left: 10px;
}
</style>
