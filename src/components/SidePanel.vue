<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title class="text-primary">
        <v-icon class="mr-2">mdi-grid</v-icon>
        Card Details
      </v-expansion-panel-title>
      <v-expansion-panel-text></v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="text-primary">
        <v-icon class="mr-2">mdi-cog</v-icon>
        Today's Transactions
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-list>
          <v-list-item
            v-for="(transaction, index) in transactions"
            :key="index"
            class="transaction-item"
          >
            <v-list-item-icon>
              <v-avatar color="blue-lighten-4">
                <v-icon
                  :color="transaction.type === 'credit' ? 'blue' : 'blue'"
                >
                  {{
                    transaction.type === "credit"
                      ? "mdi-arrow-down"
                      : "mdi-arrow-up"
                  }}
                </v-icon>
              </v-avatar>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="transaction-title">
                {{ transaction.title }}
              </v-list-item-title>
              <v-list-item-subtitle class="transaction-date">
                {{ transaction.date }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="transaction-desc">
                {{ transaction.description }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-content class="text-right">
              <v-list-item-title
                :class="transaction.type === 'credit' ? 'credit' : 'debit'"
              >
                {{ transaction.amount }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SidePanel",
  data() {
    return {
      transactions: [
        {
          title: "Ordered Food",
          date: "20th May 2022",
          amount: "- $150.50",
          description: "Charges applied on credit card",
          type: "debit",
        },
        {
          title: "Ticket Refund",
          date: "20th May 2022",
          amount: "+ $50.50",
          description: "Amount credited on debit card",
          type: "credit",
        },
        {
          title: "Interest credited",
          date: "20th May 2022",
          amount: "+ $5.50",
          description: "Charges applied on credit card",
          type: "credit",
        },
        {
          title: "Electricity bill paid",
          date: "20th May 2022",
          amount: "- $1050.50",
          description: "Charges applied on credit card",
          type: "debit",
        },
        {
          title: "Interest credited",
          date: "20th May 2022",
          amount: "+ $5.50",
          description: "Charges applied on credit card",
          type: "credit",
        },
      ],
    };
  },
});
</script>

<style scoped>
.transaction-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
}

.transaction-title {
  font-weight: bold;
}

.transaction-date,
.transaction-desc {
  font-size: 0.9rem;
  color: #757575;
}

.debit {
  color: red;
}

.credit {
  color: green;
}

.v-list-item-content.text-right {
  min-width: 100px;
}

.transaction-item v-icon {
  font-size: 32px;
}
</style>
