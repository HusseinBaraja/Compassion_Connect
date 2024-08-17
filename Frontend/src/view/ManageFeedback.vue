<template>
  <div
    class="min-h-screen min-w-full p-4 bg-gradient-to-r from-[#A2999E] via-[#846A6A] to-[#353B3C]"
  >
    <div class="mb-4 flex flex-wrap gap-2">
      <input
        type="text"
        v-model="searchQuery"
        class="border p-2 w-full sm:w-auto flex-grow rounded-md shadow-sm"
        placeholder="Search Feedback..."
      />
    </div>
    <div class="overflow-x-auto shadow border-b border-gray-200 sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead
          class="bg-[#C6C7C4] text-[#353B3C] uppercase tracking-wider font-medium text-left"
        >
          <tr>
            <th class="px-6 py-3">ID</th>
            <th class="px-6 py-3">User</th>
            <th class="px-6 py-3">Date Submitted</th>
            <th class="px-6 py-3">Type</th>
            <th class="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-[#EEF0F2] divide-y divide-gray-200">
          <tr
            v-for="feedback in filteredFeedback"
            :key="feedback.id"
            class="font-normal"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              {{ feedback.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ feedback.user }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ feedback.date }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ feedback.type }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-left">
              <button
                @click.prevent="showDetails(feedback)"
                class="text-white bg-[#353B3C] hover:bg-[#1f2223] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                View
              </button>
              <button
                @click.prevent="openFeedbackEditModal(feedback)"
                class="text-white bg-[#353B3C] hover:bg-[#1f2223] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Edit
              </button>
              <button
                @click.prevent="deleteFeedback(feedback.id)"
                class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal for Feedback Details -->
    <div
      v-if="selectedFeedback"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
    >
      <div
        class="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-2xl mx-4 md:mx-auto my-10"
      >
        <div class="px-6 py-4">
          <h3 class="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
            Feedback Details
          </h3>
          <div class="space-y-3">
            <p class="text-sm md:text-base text-gray-500">
              Feedback Id: {{ selectedFeedback.id }}
            </p>
            <p class="text-sm md:text-base text-gray-500">
              User Id: {{ selectedFeedback.user }}
            </p>
            <p class="text-sm md:text-base text-gray-500">
              Date: {{ selectedFeedback.date }}
            </p>

            <p class="text-sm md:text-base text-gray-500">
              Type: {{ selectedFeedback.type }}
            </p>
            <p class="text-sm md:text-base text-gray-500">
              Content: {{ selectedFeedback.content }}
            </p>
          </div>

          <div class="flex justify-end pt-5">
            <button
              @click="selectedFeedback = null"
              class="bg-gray-600 hover:bg-gray-500 mr-2 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Edit Feedback -->
    <div
      v-if="feedbackModal === true"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-gray-800 opacity-75"
        @click="cancelEditPost"
      ></div>
      <div class="bg-white p-6 rounded-lg shadow-xl z-10" style="width: 35%">
        <h2 class="text-2xl font-bold mb-4">Edit Post</h2>
        <div class="mb-4">
          <!-- Form Fields for Editing -->
          <label class="block text-sm text-gray-700">Feedback ID</label>
          <input
            class="p-2 border rounded-md w-full"
            readonly
            v-model="editPostModal.id"
          />
          <label class="block text-sm text-gray-700">User Id</label>
          <input
            class="p-2 border rounded-md w-full"
            readonly
            v-model="editPostModal.user"
          />
          <label class="block text-sm text-gray-700 mt-4">Feedback Type</label>
          <input
            class="p-2 border rounded-md w-full"
            v-model="editPostModal.type"
          />

          <label class="block text-sm text-gray-700 mt-4"
            >Feedback Content</label
          >
          <input
            class="p-2 border rounded-md w-full"
            v-model="editPostModal.content"
          />
        </div>
        <div class="flex justify-end">
          <button
            @click="cancelEditPost"
            class="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            @click="submitEditFeedback"
            class="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  data() {
    return {
      feedbacks: [],
      commentText: "",
      feedbackModal: false,
      feedbackToResolve: null,
      selectedFeedback: null,
      editPostModal: {
        id: null, // Assuming pid is needed for identification
        type: "",
        content: "",
        uid: "",
      },
      searchQuery: "",
      selectedStatus: "",
      statuses: ["Pending", "Resolved"],
    };
  },
  computed: {
    filteredFeedback() {
      let searchLower = this.searchQuery.toLowerCase();
      return this.feedbacks.filter((fb) => {
        return (
          (searchLower === "" ||
            fb.content.toLowerCase().includes(searchLower) ||
            fb.user.toLowerCase().includes(searchLower)) &&
          (this.selectedStatus === "" || fb.status === this.selectedStatus)
        );
      });
    },
  },
  methods: {
    // New method to fetch feedbacks from the backend
    async fetchFeedbacks() {
      try {
        const res = await axios.get(`${this.$api}/feedback/all`);
        // Assuming your API response is an array of feedback objects

        // Transform the response data into the desired format
        this.feedbacks = res.data.map((feedback) => ({
          id: feedback.token,
          user: feedback.uid,
          date: feedback.timestamp,
          type: feedback.type,
          //There is no status in the database, So either add it or remove it from here and from the table
          // status: feedback.status,
          content: feedback.content,
        }));
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        // Handle the error as needed (show an error message, etc.)
      }
    },
    openFeedbackEditModal(feedback) {
      this.editPostModal = { ...feedback };
      this.feedbackToEdit = feedback;
      console.log(this.feedbackToEdit);
      this.feedbackModal = true;
    },
    cancelEditPost() {
      this.feedbackModal = false;
    },
    editFeedback() {
      // Update the status of the feedback to 'Resolved' in your cloud-based system
      // Example: this.feedbackToResolve.status = 'Resolved';
      this.feedbackModal = false;
    },
    // Delete feedback
    async deleteFeedback(token) {
      try {
        const res = await axios.delete(`${this.$api}/feedback/${token}/delete`);

        if (res.data && res.data.message === "Feedback deleted successfully") {
          console.log("Feedback deleted successfully");
        } else {
          console.error("Feedback deletion failed");
        }
      } catch (error) {
        console.error("Error deleting feedback:", error);
      }
    },
    showDetails(feedback) {
      this.selectedFeedback = feedback;
    },
    // New method to submit edited feedback
    async submitEditFeedback() {
      try {
        const { id, type, content } = this.editPostModal;

        const timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");
        const res = await axios.put(
          `${this.$api}/feedback/${id}/update`,
          {},
          {
            content,
            type,
            timestamp,
          }
        );

        if (res.data && res.data.message === "Feedback updated successfully") {
          console.log("Feedback updated successfully");
          // Update the feedbacks array with the edited feedback
          const index = this.feedbacks.findIndex(
            (feedback) => feedback.id === id
          );
          if (index !== -1) {
            this.feedbacks[index] = { ...this.feedbacks[index], content, type };
          }
        } else {
          console.error("Feedback update failed");
        }
        this.feedbackModal = false; // Close the modal
      } catch (error) {
        console.error("Error updating feedback:", error);
      }
    },
  },
  mounted() {
    this.fetchFeedbacks();
  },
};
</script>

<style scoped>
/* Ensure full viewport height for the container */
.min-h-screen {
  min-height: 100vh;
}

/* Ensure full viewport width for the container */
.min-w-fulll {
  min-width: 100vw;
}
</style>
