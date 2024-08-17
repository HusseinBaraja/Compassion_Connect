<!-- File: RewardManagement.vue -->
<template>
  <div
    class="container mx-auto p-4 bg-gradient-to-r from-[#A2999E] via-[#846A6A] to-[#353B3C] min-h-screen"
  >
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-6 text-white">Add New Reward</h2>
      <form
        @submit.prevent="addReward"
        class="flex flex-col gap-6 p-4 items-center"
      >
        <div class="flex flex-col gap-2 w-1/2">
          <label for="name" class="font-medium text-white">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter the reward name"
            v-model="newReward.name"
            class="w-full ring-2 bg-[#EEF0F2] ring-gray-700 rounded-sm shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
            required
          />
        </div>

        <div class="flex flex-col gap-2 w-1/2">
          <label for="description" class="font-medium text-white"
            >Description</label
          >
          <textarea
            id="description"
            placeholder="Describe the reward"
            v-model="newReward.description"
            class="w-full h-24 ring-2 bg-[#EEF0F2] ring-gray-700 rounded-sm shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
            required
          ></textarea>
        </div>

        <div
          class="flex flex-col md:flex-row gap-4 items-center w-full md:w-1/2"
        >
          <div class="flex-1 flex flex-col gap-2">
            <label for="value" class="font-medium text-white">Value</label>
            <input
              id="value"
              type="number"
              placeholder="0"
              v-model="newReward.value"
              class="w-full ring-2 bg-[#EEF0F2] ring-gray-700 rounded-sm shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              required
            />
          </div>
          <div class="flex-1 flex flex-col gap-2">
            <label for="type" class="font-medium text-white">Type</label>
            <select
              id="type"
              v-model="newReward.type"
              class="w-full ring-2 bg-[#EEF0F2] ring-gray-700 rounded-sm shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
            >
              <option disabled value="">Select Type</option>
              <option value="points">Points</option>
              <option value="currency">RM</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          class="bg-[#353B3C] hover:bg-[#1F2223] text-white text-lg py-2 px-6 rounded-md self-center mt-4"
        >
          Add Reward
        </button>
      </form>
    </div>
    <div>
      <h2 class="text-2xl font-semibold mb-4 text-white">Reward Display</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="reward in paginatedRewards"
          :key="reward.id"
          class="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-[#EEF0F2]"
          @click="selectReward(reward)"
        >
          <div class="font-semibold">Name: {{ reward.name }}</div>
          <div>Description: {{ reward.description }}</div>
          <div>Value: {{ reward.value }} {{ reward.type }}</div>
        </div>
      </div>

      <div class="flex justify-center mt-6">
        <button
          @click="previousPage"
          class="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 mr-2"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          class="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  </div>

  <div
    v-if="selectedReward"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50"
    @click="closeModal"
  >
    >
    <div
      class="bg-white shadow-xl rounded-2xl text-center overflow-hidden w-full max-w-lg p-6 mx-auto"
      @click.stop
    >
      <!-- Modal header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">{{ selectedReward.name }}</h3>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <!-- Close button SVG icon -->
        </button>
      </div>

      <!-- Modal body -->
      <div class="mb-4">
        <p>{{ selectedReward.description }}</p>
        <p>Value: {{ selectedReward.value }} {{ selectedReward.type }}</p>
      </div>

      <div class="flex justify-end">
        <!-- Cancel button -->
        <button
          @click="closeModal"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none mr-4"
        >
          Cancel
        </button>
        <!-- Delete button -->
        <button
          @click="deleteRewardAndClose(selectedReward.id)"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RewardManagement",
  data() {
    return {
      rewards: [],
      newReward: {
        name: "",
        description: "",
        value: 0,
        type: "",
      },
      currentPage: 1,
      rewardsPerPage: 6,
      selectedReward: null,
    };
  },
  computed: {
    paginatedRewards() {
      const start = (this.currentPage - 1) * this.rewardsPerPage;
      const end = start + this.rewardsPerPage;
      return this.rewards.slice(start, end);
    },
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
  mounted() {
    this.fetchRewards();
  },
  methods: {
    async fetchRewards() {
      try {
        const res = await this.axios.get(this.$api + "/rewards/all", {
          headers: {
            Authorization: this.user.token,
          },
        });
        console.log(res); // Assuming your backend is running on the same host
        const formattedRewards = res.data.map((reward) => ({
          id: reward.rid,
          name: reward.item,
          description: reward.description,
          value: reward.required_points,
        }));
        console.log(formattedRewards);
        this.rewards = formattedRewards;
      } catch (error) {
        console.error("Error fetching rewards:", error);
      }
    },
    async deleteRewardAndClose(id) {
      try {
        await axios.delete(`${this.$api}/rewards/${id}/delete`);
        this.deleteReward(id); // Call your existing delete method
        this.closeModal(); // Then close the modal
      } catch (error) {
        console.error("Error deleting reward:", error);
      }
    },
    async addReward() {
      try {
        const response = await axios.post(`${this.$api}/rewards/add`, {
          item: this.newReward.name,
          description: this.newReward.description,
          required_points: this.newReward.value,
        });

        console.log(response.data); // Assuming your backend returns some information about the added reward

        // You can handle the response data here as needed
        // For example, update the UI or show a success message
        this.rewards.push({
          id: response.data.rewardId,
          name: this.newReward.name,
          description: this.newReward.description,
          value: this.newReward.value,
        });

        this.resetNewReward(); // Reset the form after successful addition
      } catch (error) {
        console.error("Error adding reward:", error);
        // Handle error, show a message, etc.
      }
    },

    deleteReward(rewardId) {
      this.rewards = this.rewards.filter((reward) => reward.id !== rewardId);
    },
    resetNewReward() {
      this.newReward = {
        name: "",
        description: "",
        value: 0,
        type: "",
      };
    },
    nextPage() {
      if (this.currentPage * this.rewardsPerPage < this.rewards.length) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    selectReward(reward) {
      this.selectedReward = reward;
    },
    closeModal() {
      this.selectedReward = null;
    },
  },
};
</script>

<style scoped>
/* Hide the number input arrows */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield; /* For Firefox */
}
</style>
