<template>
  <v-dialog v-model="localDialogOpen" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Add New Card</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="cardForm" v-model="isValid" lazy-validation>
          <v-text-field
            v-model="form.cardHolder"
            label="Card Holder Name"
            :rules="[
              (v) => !!v || 'Card Holder Name is required',
              (v) => v.length <= 35 || 'Max 35 characters',
            ]"
            required
            maxlength="35"
          ></v-text-field>

          <v-text-field
            v-model="form.bankName"
            label="Bank Name"
            :rules="[(v) => !!v || 'Bank Name is required']"
            required
          ></v-text-field>

          <v-select
            v-model="form.cardType"
            :items="['Credit', 'Debit']"
            label="Card Type"
            :rules="[(v) => !!v || 'Card Type is required']"
            required
          ></v-select>

          <v-text-field
            v-model="form.cardNumber"
            label="Card Number"
            required
            type="number"
            maxlength="16"
            counter="16"
            hint="Enter a valid 16-digit card number"
            :rules="[
              (v) => !!v || 'Card Number is required',
              (v) => /^\d{16}$/.test(v) || 'Invalid card number',
            ]"
          ></v-text-field>

          <v-text-field
            v-model="form.expiryDate"
            label="Valid Till (MM/YYYY)"
            required
            hint="e.g., 12/24"
            :rules="[
              (v) => !!v || 'Expiry date is required',
              (v) => validateExpiryDate(v) || 'Invalid expiry date',
            ]"
          ></v-text-field>

          <v-text-field
            v-model="form.cvv"
            label="CVV"
            type="password"
            maxlength="3"
            required
            hint="3-digit code"
            :rules="[
              (v) => !!v || 'CVV is required',
              (v) => /^\d{3}$/.test(v) || 'Invalid CVV',
            ]"
          ></v-text-field>

          <div class="d-flex justify-space-between">
            <v-checkbox
              v-model="form.setAsDefault"
              label="Set Card as Default"
            ></v-checkbox>

            <v-checkbox
              v-model="form.addToGPay"
              label="Add this card to GPay"
            ></v-checkbox>
          </div>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="red" variant="text" @click="closeDialog">Cancel</v-btn>
        <v-btn color="green" variant="text" @click="submitCardDetails"
          >Add Card</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { toast, type ToastOptions } from "vue3-toastify";
import type { Card } from "@/store/index";

export default defineComponent({
  name: "AddCardDialog",
  props: {
    isDialogOpen: {
      type: Boolean,
      required: true,
    },
    existingCards: {
      type: Array as () => Card[],
      required: true,
    },
  },
  emits: ["close", "addCard"],
  setup(props, { emit }) {
    const isValid = ref(false);
    const defaultFormState = {
      cardHolder: "",
      bankName: "",
      cardType: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      setAsDefault: false,
      addToGPay: false,
    };
    const form = ref({ ...defaultFormState });

    const localDialogOpen = ref(props.isDialogOpen);

    watch(
      () => props.isDialogOpen,
      (newVal) => {
        localDialogOpen.value = newVal;
      }
    );

    const resetForm = () => {
      form.value = { ...defaultFormState };
    };

    const closeDialog = () => {
      resetForm();
      emit("close");
    };

    const generateUniqueId = () => {
      return Math.random().toString(36).substr(2, 9);
    };

    const validateExpiryDate = (expiryDate: string) => {
      const [month, year] = expiryDate.split("/").map(Number);
      if (!month || !year) return false;
      const today = new Date();
      const expiry = new Date(`20${year}-${month}-01`);
      return expiry > today;
    };

    const validateCardDetails = () => {
      if (form.value.setAsDefault) {
        const defaultCard = props.existingCards.find(
          (card: Card) => card.cardType === form.value.cardType && card.default
        );
        if (defaultCard) {
          toast.error("The selected card type already has a default card.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          } as ToastOptions);
          return false;
        }
      }
      return true;
    };

    const submitCardDetails = () => {
      const formRef = ref(null);
      if (isValid.value && validateCardDetails()) {
        const newCard: Card = {
          id: generateUniqueId(),
          name: form.value.cardHolder,
          bankName: form.value.bankName,
          cardType: form.value.cardType.toLowerCase(),
          cardNumber: form.value.cardNumber,
          validTill: form.value.expiryDate,
          cvv: form.value.cvv,
          showNumber: false,
          setDefault: form.value.setAsDefault,
          addToGPay: form.value.addToGPay,
          locked: false,
          archived: false,
          default: form.value.setAsDefault,
        };

        emit("addCard", newCard);
        closeDialog();
        toast.success("Card added successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        } as ToastOptions);
      } else {
        toast.error("Please fill in all card details correctly", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        } as ToastOptions);
      }
    };

    return {
      form,
      isValid,
      localDialogOpen,
      closeDialog,
      submitCardDetails,
      validateExpiryDate,
    };
  },
});
</script>

<style scoped>
.v-card {
  padding: 20px;
}
</style>
