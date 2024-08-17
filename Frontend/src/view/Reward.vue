<template>
  <section
    class="h-screen bg-gradient-to-r from-[#C6C7C4] via-[#A2999E] to-[#846A6A] overflow-hidden"
  >
    <div class="w-full md:w-1/2 p-6">
      <p class="font-semibold text-xl text-coolGray-800">Rewards</p>
      <p class="font-medium text-sm text-coolGray-500">245 Points</p>
    </div>
    <div class="flex flex-wrap p-6">
      <div class="w-full">
        <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              v-on:click="toggleTabs(1)"
              v-bind:class="{
                'text-[#353B3C] bg-white': openTab !== 1,
                'text-white bg-[#353B3C]': openTab === 1,
              }"
            >
              Rewards Available
            </a>
          </li>
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              v-on:click="toggleTabs(2)"
              v-bind:class="{
                'text-[#353B3C] bg-white': openTab !== 2,
                'text-white bg-[#353B3C]': openTab === 2,
              }"
            >
              Rewards History
            </a>
          </li>
        </ul>
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
        >
          <div class="px-4 py-5 flex-auto">
            <div class="tab-content tab-space">
              <div v-if="openTab === 1">
                <!-- Rewards Card -->
                <section class="bg-coolGray-50 py-4">
                  <div class="container px-4 mx-auto">
                    <div class="flex flex-wrap -m-3">
                      <div
                        class="w-full md:w-1/2 xl:w-1/3 p-3"
                        v-for="data in reward"
                        :key="data.rid"
                      >
                        <div
                          class="shadow-lg h-full border border-coolGray-100 bg-white rounded-md shadow-dashboard"
                        >
                          <!-- Reward items and header -->
                          <div class="p-8 px-6 pb-0">
                            <div
                              class="flex flex-wrap items-center justify-between -m-2 mb-0"
                            >
                              <div class="w-auto p-2">
                                <h2 class="text-coolGray-900 text-lg">
                                  {{ data.rid }}
                                </h2>
                              </div>
                              <div class="w-auto p-2">
                                <p
                                  class="px-2 py-1 text-xs text-darkCoolGray-500 font-medium bg-darkCoolGray-100 rounded-full"
                                >
                                  30 days
                                </p>
                              </div>
                            </div>
                            <div class="flex flex-wrap">
                              <div class="w-full">
                                <div class="py-4 border-b border-coolGray-100">
                                  <div
                                    class="flex flex-wrap justify-between -m-2"
                                  >
                                    <div class="w-auto p-2">
                                      <div class="flex items-center">
                                        <div
                                          class="mr-2 w-2 h-2 bg-[#353B3C] rounded-full"
                                        ></div>
                                        <p
                                          class="text-xs text-coolGray-500 font-medium"
                                        >
                                          Reward Item
                                        </p>
                                      </div>
                                    </div>
                                    <div class="w-auto p-2">
                                      <p
                                        class="text-xs text-coolGray-500 font-medium uppercase"
                                      >
                                        <span>{{ data.item }}</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Description -->
                          <div class="py-4 border-b border-coolGray-100">
                            <div
                              class="flex flex-wrap justify-between px-6 -m-2"
                            >
                              <div class="w-auto p-2">
                                <div class="flex items-center">
                                  <div
                                    class="mr-2 w-2 h-2 bg-[#353B3C] rounded-full"
                                  ></div>
                                  <p
                                    class="text-xs text-coolGray-500 font-medium"
                                  >
                                    Description
                                  </p>
                                </div>
                              </div>
                              <div class="w-auto p-2">
                                <p
                                  class="truncate max-w-[100px] text-xs text-coolGray-500 font-medium uppercase"
                                >
                                  <span>{{ data.description }}</span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <!-- Required Points -->
                          <div class="py-4 border-b border-coolGray-100">
                            <div
                              class="flex flex-wrap justify-between px-6 -m-2"
                            >
                              <div class="w-auto p-2">
                                <div class="flex items-center">
                                  <div
                                    class="mr-2 w-2 h-2 bg-[#353B3C] rounded-full"
                                  ></div>
                                  <p
                                    class="text-xs text-coolGray-500 font-medium"
                                  >
                                    Required Points
                                  </p>
                                </div>
                              </div>
                              <div class="w-auto p-2">
                                <p
                                  class="text-xs text-coolGray-500 font-medium uppercase"
                                >
                                  <span>{{ data.required_points }}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="p-4">
                            <a
                              class="flex items-center text-xs text-white hover:text-gray-200 font-medium w-full"
                              href="#"
                            >
                              <button
                                class="mr-1 bg-[#353B3C] rounded-lg p-2 w-full text-center"
                                @click="addReward(data)"
                              >
                                Get Reward
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div v-if="openTab === 2">
                <div
                  class="p-4 bg-gradient-to-r from-[#C6C7C4] via-[#A2999E] to-[#846A6A]"
                >
                  <div class="p-4">
                    <div
                      class="dashboard-area bg-[#EEF0F2] p-5 rounded-lg shadow-md mb-6"
                    >
                      <h2 class="text-2xl font-bold text-gray-700 mb-3">
                        Search Rewards
                      </h2>

                      <!-- Search Bar  -->
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
                              <thead class="bg-[#EEF0F2]">
                                <tr>
                                  <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Reward History Id
                                  </th>
                                  <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Reward Id
                                  </th>
                                  <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Reward Item
                                  </th>

                                  <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Obtained DateTime
                                  </th>
                                  <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <!-- Table Body -->
                              <tbody class="bg-white divide-y divide-gray-200">
                                <tr
                                  v-for="data in reward_history"
                                  :key="data.rid"
                                >
                                  <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">
                                      {{ data.rhid }}
                                    </div>
                                  </td>
                                  <td
                                    class="px-6 py-4claimRewardclaim whitespace-nowrap"
                                  >
                                    <div class="text-sm text-gray-900">
                                      {{ data.rid }}
                                    </div>
                                  </td>
                                  <td
                                    class="px-6 py-4claimRewardclaim whitespace-nowrap"
                                  >
                                    <div class="text-sm text-gray-900">
                                      {{ data.item }}
                                    </div>
                                  </td>
                                  <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">
                                      {{ data.timestamp }}
                                    </div>
                                  </td>
                                  <td
                                    :class="{
                                      'text-green-600':
                                        reward.status === 'Claimed',
                                    }"
                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                  >
                                    {{ data.status ? "Claimed" : "Unclaimed" }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Modal for Reward Details -->
                    <div
                      v-if="selectedReward"
                      class="fixed inset-0 z-50 flex items-center justify-center"
                    >
                      <div
                        class="absolute inset-0 bg-gray-800 opacity-75"
                        @click="closeDetails"
                      ></div>
                      <div class="bg-white p-6 rounded-lg shadow-xl z-10">
                        <h2 class="text-2xl font-bold mb-4">Reward Details</h2>
                        <div>
                          <strong>Reward rid:</strong>
                          {{ selectedReward.reward.rewardId }}
                        </div>
                        <div>
                          <strong>Reward item:</strong>
                          {{ selectedReward.reward.rewardName }}
                        </div>
                        <div>
                          <strong>Validity:</strong>
                          {{ selectedReward.reward.validity }}
                        </div>
                        <div>
                          <strong>Status:</strong>
                          {{ selectedReward.status }}
                        </div>
                        <button
                          @click="closeDetails"
                          class="mt-4 bg-[#846A6A] text-white py-2 px-4 rounded"
                        >
                          Close
                        </button>
                      </div>
                    </div>

                    <!-- Modal for Delete Confirmation -->
                    <div
                      v-if="deleteConfirmation"
                      class="fixed inset-0 z-50 flex items-center justify-center"
                    >
                      <div
                        class="absolute inset-0 bg-gray-800 opacity-75"
                        @click="cancelDelete"
                      ></div>
                      <div
                        class="bg-white p-6 rounded-lg shadow-xl z-10 max-w-md"
                      >
                        <h2 class="text-2xl font-bold mb-4">
                          Confirm Deletion
                        </h2>
                        <p class="mb-4">
                          Are you sure you want to delete this reward?
                        </p>
                        <div class="flex justify-end">
                          <button
                            @click="cancelDelete"
                            class="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            @click="deleteReward"
                            class="bg-red-600 text-white py-2 px-4 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "red-tabs",
  data() {
    return {
      rid: "",
      item: "",
      Deadline: "",
      required_points: "",
      // reward: [
      //     {
      //         rid: "RW1020",
      //         item: "Food Panda 30% off",
      //         description: "its food panda",
      //         required_points: "300",
      //     },
      //     {
      //         rid: "RW1021",
      //         item: "Grab Food Free Delivery",
      //         description:
      //             "its Grab.its Grab.its Grab.its Grab.its Grab.its Grab.its Grab.its Grab",
      //         required_points: "150",
      //     },
      //     {
      //         rid: "RW1022",
      //         item: "Free burger McDonalds",
      //         description: "its a burger",
      //         required_points: "450",
      //     },
      //     {
      //         rid: "RW1023",
      //         item: "Free delivery Lotus",
      //         description: "its lotus",
      //         required_points: "500",
      //     },
      // ],
      reward: [],
      reward_history: [],
      openTab: 1,
      searchTerm: "",
      activeFilter: null,
      selectedReward: null,
      deleteConfirmation: null,
      rewardToDelete: null,
    };
  },
  computed: {
    filteredRewards() {
      const filtered = this.rewards.filter((reward) => {
        const statusMatch =
          !this.activeFilter || reward.status === this.activeFilter;
        const searchMatch = reward.reward.rewardName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
        return statusMatch && searchMatch;
      });
      return filtered;
    },
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber;
    },
    toggleFilter(filter) {
      this.activeFilter = this.activeFilter === filter ? null : filter;
    },
    async getRewardData() {
      const res = await this.axios.get(this.$api + `/rewards/all`, {
        headers: {
          Authorization: this.user.token,
        },
      });
      console.log(res.data);
      this.reward = res.data;
    },
    async getRewardHistoryData() {
      const res = await this.axios.get(this.$api + `/reward-history/all`, {
        headers: {
          Authorization: this.user.token,
        },
      });

      const rewardHistory = res.data;

      // Use Promise.all to wait for all getItem promises to resolve
      const itemPromises = rewardHistory.map((r) => this.getItem(r.rid));
      const items = await Promise.all(itemPromises);

      // Assign the resolved items to the corresponding reward history entries
      rewardHistory.forEach((r, index) => {
        r.item = items[index];
      });

      this.reward_history = rewardHistory;
    },
    async getItem(rid) {
      const res = await this.axios.get(this.$api + `/rewards/${rid}`, {
        headers: {
          Authorization: this.user.token,
        },
      });

      return res.data.item;
    },
  },
  async mounted() {
    await this.getRewardData();
    await this.getRewardHistoryData();
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
