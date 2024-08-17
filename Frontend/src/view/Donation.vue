<template>
  <div
    class="bg-gradient-to-r from-[#C6C7C4] via-[#A2999E] to-[#846A6A] min-h-screen"
  >
    <h1 class="text-xl font-bold text-white mb-4 w-11/12 lg:w-10/12 mx-auto">
      Donation
    </h1>
    <app-tabs class="w-11/12 lg:w-10/12 mx-auto mb-16" :tabList="tabList">
      <template v-slot:tabPanel-1>
        <form @submit.prevent="submitAppointment">
          <div class="flex flex-col space-y-4 m-0 bg-[#EEF0F2]">
            <label class="font-semibold">Select a Time Slot:</label>
            <!-- new datepicker-->
            <VueDatePicker
              v-model="appointment.date"
              placeholder="Pick a day"
              format="MM/dd/yyyy"
              :enable-time-picker="false"
              required
              position="left"
              class="border bg-[#c7c4c4] border-gray-300 rounded p-2"
            ></VueDatePicker>

            <label class="font-semibold">Choose a Location:</label>
            <select
              class="border bg-[#C6C7C4] border-[gray-300] rounded p-2"
              required
              v-model="appointment.location"
            >
              <!-- Options for locations -->
              <option value="" disabled selected>Select Location</option>
              <option value="location1">Kuala Lumpur</option>
              <option value="location2">Selangor</option>
              <!-- Add more locations as needed -->
              <!-- PLEASE USE V-FOR -->
            </select>
            <button
              type="submit"
              class="mt-4 bg-[#353B3C] hover:bg-[#1f2223] text-white font-bold py-2 px-4 rounded self-end"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </template>
      <template v-slot:tabPanel-2>
        <form @submit.prevent="submitDonation">
          <div class="flex flex-col space-y-4">
            <label class="font-semibold">Enter Donation Amount:</label>
            <input
              type="number"
              class="border border-gray-300 rounded p-2"
              placeholder="Amount"
              required
              v-model="donation.amount"
            />

            <button
              class="mt-4 bg-[#353B3C] hover:bg-[#1f2223] text-white font-bold py-2 px-4 rounded self-end"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </template>
    </app-tabs>
  </div>
  <!--payment modal-->
  <div
    v-if="showPaymentModal === true"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div
      class="absolute inset-0 bg-gray-800 opacity-75"
      @click="cancelPaymentModal"
    ></div>
    <div
      class="w-full mx-auto rounded-lg bg-white mt-8 shadow-lg p-5 text-gray-700 z-10"
      style="max-width: 600px"
    >
      <div class="w-full pt-1 pb-5">
        <div
          class="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center"
        >
          <i class="mdi mdi-credit-card-outline text-3xl"></i>
        </div>
      </div>
      <div class="mb-10">
        <h1 class="text-center font-bold text-xl uppercase">
          Secure payment info
        </h1>
      </div>
      <div class="mb-3 flex -mx-2">
        <div class="px-2">
          <label for="type1" class="flex items-center cursor-pointer">
            <input
              type="radio"
              class="form-radio h-5 w-5 text-indigo-500"
              name="type"
              id="type1"
              checked
            />
            <img
              src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
              class="h-8 ml-3"
            />
          </label>
        </div>
        <div class="px-2">
          <label for="type2" class="flex items-center cursor-pointer">
            <input
              type="radio"
              class="form-radio h-5 w-5 text-indigo-500"
              name="type"
              id="type2"
            />
            <img
              src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
              class="h-8 ml-3"
            />
          </label>
        </div>
      </div>
      <div class="mb-3">
        <label class="font-bold text-sm mb-2 ml-1">Name on card</label>
        <div>
          <input
            v-model="paymentDetails.nameOnCard"
            class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="John Smith"
            type="text"
          />
        </div>
      </div>
      <div class="mb-3">
        <label class="font-bold text-sm mb-2 ml-1">Card number</label>
        <div>
          <input
            v-model="paymentDetails.cardNumber"
            class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="0000 0000 0000 0000"
            type="text"
          />
        </div>
      </div>
      <div class="mb-3 -mx-2 flex items-end">
        <div class="px-2 w-1/2">
          <label class="font-bold text-sm mb-2 ml-1">Expiration date</label>
          <div>
            <select
              v-model="paymentDetails.expirationMonth"
              class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
            >
              <option value="01">01 - January</option>
              <option value="02">02 - February</option>
              <option value="03">03 - March</option>
              <option value="04">04 - April</option>
              <option value="05">05 - May</option>
              <option value="06">06 - June</option>
              <option value="07">07 - July</option>
              <option value="08">08 - August</option>
              <option value="09">09 - September</option>
              <option value="10">10 - October</option>
              <option value="11">11 - November</option>
              <option value="12">12 - December</option>
            </select>
          </div>
        </div>
        <div class="px-2 w-1/2">
          <select
            v-model="paymentDetails.expirationYear"
            class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
          >
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
          </select>
        </div>
      </div>
      <div class="mb-10">
        <label class="font-bold text-sm mb-2 ml-1">Security code</label>
        <div>
          <input
            v-model="paymentDetails.securityCode"
            class="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="000"
            type="text"
          />
        </div>
      </div>
      <div>
        <button
          @click="donateMoney"
          class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
        >
          <i class="mdi mdi-lock-outline mr-1"></i> PAY NOW
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AppTabs from "../components/AppTabs.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "Donation",
  components: { AppTabs, VueDatePicker },
  data() {
    return {
      tabList: ["Food Appointment", "Money Donation"],
      donation: { amount: null },
      appointment: {
        date: null,
        location: null,
      },
      showPaymentModal: false,
      paymentDetails: {
        nameOnCard: "",
        cardNumber: "",
        expirationMonth: "",
        expirationYear: "",
        securityCode: "",
      },
    };
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
  methods: {
    togglePaymentModal() {
      this.showPaymentModal = true;
    },
    cancelPaymentModal() {
      this.showPaymentModal = false;
    },
    submitAppointment() {
      const { date, location } = this.appointment;
      if (date && location) {
        // Both date and location are not empty
        // Retrieve the information and proceed with the booking or other logic
        this.bookAppointment(); // or any other relevant method
      } else {
        alert("Please fill in both the date and location.");
      }
    },
    submitDonation() {
      const { amount } = this.donation;
      if (amount > 0) {
        this.togglePaymentModal();
      } else {
        alert("Please fill in both the date and location.");
      }
    },
    async bookAppointment() {
      let newData = this.appointment;
      if (newData.date && newData.location) {
        // testing purpose
        // PLEASE OBSERVE THE WAY I TURN DATE TO TIMESTAMP
        // OTHERWISE, NO MATTER HOW MANY TIMES YOU TRY IT WILL BE FAILED
        // IN THIS TEST DATA, "10/10/2023" will be assumed selected by user
        // same to location
        newData.timestamp = new Date("10/10/2023")
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
        newData.location = "Location Z";
        // testing purpose

        // Add appointment
        const res = await this.axios.post(
          this.$api + `/appointment/${this.user.uid}/add`,
          newData,
          { headers: { Authorization: this.user.token } }
        );
        const { message, aid } = res.data;
        alert(`${message}, Your Appointment ID is ${aid}`);
      } else {
        alert("Please fill in necessary slot to book an appointment.");
      }
    },
    async donateMoney() {
      try {
        let newData = parseInt(this.donation.amount);
        console.log(typeof newData);
        if (newData > 0) {
          // Temporary data to send to the payment gateway
          newData = {
            type: "Money",
            amount: newData,
            food_description: "N/A",
          };

          // Add donation
          const res = await this.axios.post(
            this.$api + `/donation/${this.user.uid}/add`,
            newData,
            { headers: { Authorization: this.user.token } }
          );
          const { message, did } = res.data;
          alert(`${message}, Your Donation ID is ${did}`);

          // give point
          // logic: points = amount/2

          const res_rew = await this.axios.post(
            this.$api + `/user-data/${this.user.uid}/addpoint`,
            { point: parseInt(newData.amount / 2) },
            { headers: { Authorization: this.user.token } }
          );

          alert(res_rew.data.message);

          this.cancelPaymentModal();
        } else {
          alert("Please fill in necessary slot to donate money.");
        }
      } catch (e) {
        alert(e.message);
      }
    },
  },
};
</script>

<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);
.absolute-right {
  position: absolute;
  right: 5rem;
  width: 200%;
  border: 3px solid #73ad21;
}

/* Hide the number input arrows */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
