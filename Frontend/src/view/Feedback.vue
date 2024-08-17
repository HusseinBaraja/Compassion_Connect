<template>
  <div
    class="bg-gradient-to-r from-[#C6C7C4] via-[#A2999E] to-[#846A6A] h-screen overflow-y-auto"
  >
    <div class="w-full h-full justify-center flex">
      <div class="flex flex-wrap gap-4 max-w-[1000px]">
        <!-- Search Bar and Add Feedback Button -->
        <div class="w-full flex items-center p-4 pt-0">
          <!-- Search Bar -->
          <div class="flex-1">
            <label for="search" class="text-sm leading-7 text-gray-600"
              >Search Feedbacks</label
            >
            <input
              v-model="searchTerm"
              type="text"
              id="search"
              name="search"
              class="w-full h-10 px-3 rounded border border-gray-300 bg-white text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="Search"
            />
          </div>
          <!-- Add Feedback Button -->
          <button
            @click="openAddFeedbackModal"
            class="h-10 ml-4 -mb-6 rounded border-0 bg-[#353B3C] py-2 px-6 text-lg text-white hover:bg-[#A2999E] focus:outline-none"
          >
            Add Feedback
          </button>
        </div>

        <!-- Add Feedback Modal -->
        <div
          v-if="isAddFeedbackModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            class="absolute inset-0 bg-gray-800 opacity-75"
            @click="closeAddFeedbackModal"
          ></div>
          <div class="bg-white p-6 rounded-lg shadow-xl z-10 max-w-md">
            <h2 class="text-2xl font-bold mb-4">Add Feedback</h2>
            <div class="mb-4">
              <label for="feedbackType" class="text-sm leading-7 text-gray-600"
                >Feedback Type</label
              >
              <select
                v-model="feedback.type"
                id="feedbackType"
                name="feedbackType"
                class="w-full h-10 px-3 rounded border border-gray-300 bg-white text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                required
              >
                <!-- Add options for feedback types -->

                <option :value="`${t}`" v-for="t in feedback_types" :key="t.id">
                  {{ t }}
                </option>
              </select>
            </div>
            <div class="mb-4">
              <label
                for="feedbackContent"
                class="text-sm leading-7 text-gray-600"
                >Content</label
              >
              <textarea
                v-model="feedback.content"
                id="feedbackContent"
                name="feedbackContent"
                class="h-16 overflow-y-auto w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              ></textarea>
            </div>
            <div class="flex justify-end">
              <button
                @click="closeAddFeedbackModal"
                class="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                @click="submitFeedbackModal"
                class="bg-[#353B3C] text-white py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <!-- Feedback Selection Section -->
        <div class="w-full flex pt-4 border-t border-gray-400/50">
          <!-- My Feedbacks List -->
          <div
            class="w-2/5 bg-[#353B3C] p-2 rounded-lg shadow h-full max-h-[700px] overflow-y-auto"
          >
            <div class="w-full flex justify-between items-center p-3">
              <h2 class="text-md font-semibold text-white">My Feedbacks</h2>
            </div>
            <div class="grid text-xs grid-cols-1 gap-4 p-2">
              <div v-for="data in feedback_data" :key="data.id">
                <Card @click="selected_data = data">
                  <div class="flex">
                    <div>{{ data.token }}</div>
                    <div class="grow"></div>
                    <div>
                      {{ formatTimestamp(data.timestamp) }}
                    </div>
                  </div>
                  <div class="flex flex-nowrap mt-4 items-center">
                    <div class="mr-2 bg-gray-400 rounded p-2 text-white">
                      {{ data.type }}
                    </div>
                    <div class="w-full truncate">
                      {{ data.content }}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <!--  View Feedback Section -->
          <div class="w-3/5 ml-2 flex flex-col">
            <!-- View Feedback -->
            <div
              class="w-full border rounded-lg bg-white p-4 h-fit overflow-y-auto"
            >
              <p
                class="uppercase text-rhino-300 text-xs font-bold tracking-widest mb-1 text-center"
              >
                VIEW FEEDBACK
              </p>
              <transition name="fade">
                <div class="flex flex-wrap gap-2" v-if="selected_data">
                  <span
                    class="w-full h-fit font-heading font-semibold text-xl text-rhino-700 text-center"
                  >
                    <p>{{ selected_data.title }}</p>
                  </span>
                  <span
                    class="w-full h-fit text-sm leading-7 text-gray-600 grid grid-cols-2"
                  >
                    <div class="w-full flex justify-start">
                      <div class="mr-4 font-semibold">TokenID</div>

                      {{ selected_data.token }}
                    </div>
                    <div class="w-full flex justify-start">
                      <div class="mr-4 font-semibold">Type</div>

                      {{ selected_data.type }}
                    </div>
                    <div class="w-full flex col-span-2">
                      <div class="mr-4 font-semibold">Date Time</div>
                      {{ formatTimestamp(selected_data.timestamp) }}
                    </div>
                  </span>
                  <span class="w-full h-fit block">
                    <textarea
                      readonly
                      class="h-[300px] w-full p-2 font-normal resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                      :value="selected_data.content"
                    ></textarea>
                  </span>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <!-- Extra space to scroll -->
        <div class="h-[50px] w-full"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rating: null,
      selected_data: null,
      searchTerm: "",
      isAddFeedbackModalOpen: false,
      feedback_data: [],
      feedback: {
        type: null,
        content: null,
      },
      feedback_types: ["Complaint", "Suggestion", "Praise"],

      // Testing local data
      // feedback_data: [
      //     {
      //         token: 1,
      //         content:
      //             "Donation system sucks. Donation system sucks. Donation system sucks. Donation system sucks.",
      //         timestamp: 1699923600,
      //         type: "Donation",
      //     },
      // ],
    };
  },
  computed: {
    filteredFeedbacks() {
      return this.feedback_data.filter((data) =>
        data.content.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
  methods: {
    openAddFeedbackModal() {
      this.isAddFeedbackModalOpen = true;
    },
    closeAddFeedbackModal() {
      this.isAddFeedbackModalOpen = false;
    },
    async submitFeedbackModal() {
      if (!this.feedback.type || !this.feedback.content.trim()) {
        alert("Please enter feedback title and message.");
        return;
      }

      const res = await this.axios.post(
        this.$api + `/feedback/${this.user.uid}/add`,
        this.feedback,
        {
          headers: {
            Authorization: this.user.token,
          },
        }
      );
      let data = res.data;
      if (data.token) {
        alert(data.message + ", Your Feedback ID is " + data.token);
      } else alert(data.message + ": " + data.error);

      this.feedback.type = "";
      this.feedback.content = "";
      this.isAddFeedbackModalOpen = false;
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    },
    async getFeedbackData() {
      const res = await this.axios.get(
        this.$api + `/feedback/all/${this.user.uid}`,
        {
          headers: {
            Authorization: this.user.token,
          },
        }
      );
      let data = res.data;
      this.feedback_data = data;
    },
  },
  async mounted() {
    this.feedbackData = await this.getFeedbackData();
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
      .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
