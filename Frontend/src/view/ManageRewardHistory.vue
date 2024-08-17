<template>
  <div
    class="h-screen p-4 bg-gradient-to-r from-[#A2999E] via-[#846A6A] to-[#353B3C]"
  >
    <div class="p-4">
      <div class="dashboard-area bg-[#C6C7C4] p-5 rounded-lg shadow-md mb-6">
        <h2 class="text-2xl font-bold text-gray-700 mb-3">
          Manage Rewards History
        </h2>

        <!-- Search Bar -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <input
              v-model="searchTerm"
              type="text"
              class="p-2 border rounded-md w-80"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      <!-- Rewards Table -->
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <!-- Table Header -->
                <thead class="bg-[#C6C7C4]">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Reward History ID
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Reward ID
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Reward Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Claimed Date
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <!-- Table Body -->
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(reward, index) in filteredRewards" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ reward.rhid }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ reward.rid }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ reward.item }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ reward.timestamp || "N/A" }}
                      </div>
                    </td>
                    <td
                      :class="{
                        'text-green-600': reward.status === 'Claimed',
                        'text-red-600': reward.status === 'Unclaimed',
                      }"
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                    >
                      {{ reward.status ? "Claimed" : "Unclaimed" }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                    >
                      <a
                        href="#"
                        class="text-green-500 hover:text-indigo-900"
                        @click="claimReward(reward)"
                        v-if="!reward.status"
                      >
                        Claim
                      </a>
                      <button
                        @click="deleteReward(reward)"
                        class="text-red-600 hover:text-red-900 ml-4 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal for Confirmation -->
      <div
        v-if="confirmationPopup.isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-gray-800 opacity-75"
          @click="cancelClaim"
        ></div>
        <div class="bg-white p-6 rounded-lg shadow-xl z-10 max-w-md">
          <h2 class="text-2xl font-bold mb-4">Confirmation</h2>
          <p class="mb-4">{{ confirmationPopup.message }}</p>
          <div class="flex justify-end">
            <button
              @click="cancelClaim"
              class="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              @click="handleConfirmClaim"
              class="bg-green-600 text-white py-2 px-4 rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageRewardHistory",

  data() {
    return {
      rewards: [],

      searchTerm: "",
      activeFilter: null,
      confirmationPopup: {
        isOpen: false,
        message: "",
        reward: null,
      },
      rewardToClaim: null,
      rewardToDelete: null,
      deleteConfirmation: null,
      rewardToDelete: null,
    };
  },

  computed: {
    filteredRewards() {
      const filtered = this.rewards.filter((reward) => {
        if (reward.item)
          return reward.item
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        return false;
      });
      return filtered;
    },
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },

  methods: {
    toggleFilter(filter) {
      this.activeFilter = this.activeFilter === filter ? null : filter;
    },

    claimReward(reward) {
      if (confirm("Are your sure the donor has claimed this reward?"))
        this.handleConfirmClaim(reward);
    },

    // Set the selected reward for deletion
    async deleteReward(r) {
      if (await confirm("Are you sure to delete this record?")) {
        try {
          const res = await this.axios.delete(
            `${this.$api}/reward-history/${r.rhid}/delete`,
            {
              headers: {
                Authorization: this.user.token,
              },
            }
          );
          alert(res.data.message);
          this.refreshPage();
        } catch (error) {
          console.error("Error deleting site:", error);
          //
        }
      }
    },

    refreshPage() {
      location.reload();
    },

    // Method to handle the confirmation of claiming a reward
    async handleConfirmClaim(r) {
      try {
        const res = await this.axios.put(
          `${this.$api}/reward-history/${r.rhid}/update`,
          {},
          {
            headers: {
              Authorization: this.user.token,
            },
          }
        );
        alert(res.data.message);
        this.refreshPage();
      } catch (error) {
        console.error("Error deleting site:", error);
        // Handle error as needed, e.g., show an error message
      }
    },
    async fetchRewardHistory() {
      try {
        const res = await this.axios.get(`${this.$api}/reward-history/all`, {
          headers: {
            Authorization: this.user.token,
          },
        });
        this.rewards = res.data;

        this.rewards.forEach(async (r) => {
          const rd = await this.axios.get(`${this.$api}/rewards/${r.rid}`, {
            headers: {
              Authorization: this.user.token,
            },
          });
          r.item = rd.data.item;
        });
      } catch (error) {
        console.error("Error deleting site:", error);
      }
    },
  },
  async mounted() {
    await this.fetchRewardHistory();
  },
};
</script>

<style scoped>
.bg-gradient-to-r {
  position: relative;
  overflow: hidden;
}

.bg-gradient-to-r::before {
  content: "";
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  z-index: -1;
}

.bg-gradient-to-r::after {
  content: "";
  position: absolute;
  bottom: -50px;
  left: -50px;
  width: 200px;
  height: 200px;
  z-index: -1;
}
</style>
