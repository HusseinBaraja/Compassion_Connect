<template>
  <div
    class="h-screen flex justify-center w-full p-4 bg-gradient-to-r from-[#A2999E] via-[#846A6A] to-[#353B3C]"
  >
    <div class="w-full max-w-[1000px]">
      <div class="dashboard-area bg-[#C6C7C4] p-5 rounded-lg shadow-md mb-6">
        <h2 class="text-2xl font-bold text-[#846A6A] mb-3">Analysis</h2>
      </div>
      <!--Download all pdf-->
      <div class="grid grid-cols-2 gap-4">
        <div class="grid-rows-2 gap-2 bg-white rounded shadow p-12">
          <div class="font-semibold">Total Feedback Number</div>
          <div class="w-full text-right text-[64px] pr-12">
            {{ this.analysis.feedbackNumber }}
          </div>
        </div>
        <div class="grid-rows-2 gap-2 bg-white rounded shadow p-12">
          <div class="font-semibold">Total Appointment Number</div>
          <div class="w-full text-right text-[64px] pr-12">
            {{ this.analysis.appointmentsNumber }}
          </div>
        </div>
        <div class="grid-rows-2 gap-2 bg-white rounded shadow p-12">
          <div class="font-semibold">Total Money Donation</div>
          <div class="w-full text-right text-[64px] pr-12">
            $ {{ this.analysis.moneyDonation }}
          </div>
        </div>
        <div class="grid-rows-2 gap-2 bg-white rounded shadow p-12">
          <div class="font-semibold">Total Food Donation</div>
          <div class="w-full text-right text-[64px] pr-12">
            {{ this.analysis.foodDonation }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      analysis: {
        feedbackNumber: null,
        appointmentsNumber: null,
        moneyDonation: null,
        foodDonation: null,
      },
    };
  },
  methods: {
    async fetchData() {
      const resFeedback = await this.axios.get(this.$api + "/feedback/all/", {
        headers: {
          Authorization: this.user.token,
        },
      });
      console.log(resFeedback.data);
      const resAppointment = await this.axios.get(
        this.$api + "/appointment/all/",
        {
          headers: {
            Authorization: this.user.token,
          },
        }
      );
      const resDonation = await this.axios.get(this.$api + "/donation/all/", {
        headers: {
          Authorization: this.user.token,
        },
      });

      this.analysis.feedbackNumber = resFeedback.data.length;
      this.analysis.appointmentsNumber = resAppointment.data.length;
      this.analysis.foodDonation = resDonation.data.filter(
        (d) => d.type === "Food"
      ).length;
      this.analysis.moneyDonation = resDonation.data
        .filter((d) => d.type === "Money")
        .map((d) => d.amount)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
    },
  },
  async mounted() {
    await this.fetchData();
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
};
</script>
