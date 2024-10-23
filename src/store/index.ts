import { defineStore } from "pinia";

export interface Card {
  id: string;
  name: string;
  bankName: string;
  cardType: string;
  cardNumber: string;
  validTill: string;
  cvv: string;
  showNumber: boolean;
  setDefault: boolean;
  addToGPay: boolean;
  locked: boolean;
  archived: boolean;
  default: boolean;
}

interface CardStoreState {
  cards: Card[];
  defaultCard: number | null;
}

export const useCardStore = defineStore("card", {
  state: (): CardStoreState => ({
    cards: [
      {
        id: "1",
        name: "John Watson",
        bankName: "Alpha Bank",
        cardNumber: "1234 5678 9012 9340",
        validTill: "12/24",
        cvv: "123",
        cardType: "credit",
        showNumber: false,
        setDefault: false,
        addToGPay: false,
        locked: false,
        archived: false,
        default: false,
      },
      {
        id: "2",
        name: "Alice Moore",
        bankName: "Bravo Bank",
        cardNumber: "2345 6789 0123 9876",
        validTill: "11/26",
        cvv: "456",
        cardType: "credit",
        showNumber: false,
        setDefault: false,
        addToGPay: false,
        locked: false,
        archived: false,
        default: false,
      },
      {
        id: "3",
        name: "Michael Smith",
        bankName: "Charlie Bank",
        cardNumber: "3456 7890 1234 6789",
        validTill: "03/23",
        cvv: "789",
        cardType: "credit",
        showNumber: false,
        setDefault: false,
        addToGPay: false,
        locked: false,
        archived: false,
        default: false,
      },
      {
        id: "4",
        name: "Sara Johnson",
        bankName: "Delta Bank",
        cardNumber: "4567 8901 2345 4321",
        validTill: "09/24",
        cvv: "321",
        cardType: "debit",
        showNumber: false,
        setDefault: false,
        addToGPay: false,
        locked: false,
        archived: false,
        default: false,
      },
      {
        id: "5",
        name: "Kevin Harris",
        bankName: "Echo Bank",
        cardNumber: "5678 9012 3456 9876",
        validTill: "08/25",
        cvv: "654",
        cardType: "debit",
        showNumber: false,
        setDefault: false,
        addToGPay: false,
        locked: false,
        archived: false,
        default: false,
      },
      {
        id: "6",
        name: "Emily Davis",
        bankName: "Foxtrot Bank",
        cardNumber: "6789 0123 4567 5432",
        validTill: "07/23",
        cvv: "987",
        cardType: "debit",
        showNumber: false,
        setDefault: false,
        addToGPay: false,
        locked: false,
        archived: false,
        default: false,
      },
    ],
    defaultCard: null,
  }),
  getters: {
    sortedCreditCards: (state) =>
      state.cards.filter((card) => card.cardType === "credit"),
    sortedDebitCards: (state) =>
      state.cards.filter((card) => card.cardType === "debit"),
  },
  actions: {
    updateCard(cardId: string, updatedCard: Partial<Card>) {
      const cardIndex = this.cards.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        this.cards[cardIndex] = { ...this.cards[cardIndex], ...updatedCard };
      }
    },
    addCard(newCard: Card) {
      if (newCard.default) {
        this.cards.forEach((card) => {
          if (card.cardType === newCard.cardType && card.default) {
            card.default = false;
          }
        });
      }
      this.cards.push(newCard);
    },
  },
});
