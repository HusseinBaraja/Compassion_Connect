<template>
  <div
    class="h-screen p-4 bg-gradient-to-r from-[#A2999E] via-[#846A6A] to-[#353B3C]"
  >
    <!-- Title -->
    <h3 class="text-2xl font-bold text-left py-2">Donation History</h3>

    <!-- Table -->
    <div class="overflow-x-auto relative rounded">
      <table class="w-full text-xs text-left text-[#353B3C]">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#C6C7C4] dark:text-[#353B3C]"
        >
          <tr>
            <th scope="col" class="py-1 text-center text-sm">Donation ID</th>
            <th scope="col" class="py-1 text-center text-sm">Type</th>
            <th scope="col" class="py-1 text-center text-sm">Amount</th>
            <th scope="col" class="py-1 text-center text-sm">
              Food Description
            </th>
            <th scope="col" class="py-1 text-center text-sm">Date Time</th>
            <th scope="col" class="py-1 text-center text-sm">Donor ID</th>
            <th scope="col" class="py-1 text-center text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-[#EEF0F2] dark:border-gray-700"
            v-for="data in donations"
            :key="data.id"
          >
            <td class="py-4 px-6">{{ data.did }}</td>
            <td class="py-4 px-6">{{ data.type }}</td>
            <td class="py-4 px-6">
              {{ data.amount ? data.amount : "N/A" }}
            </td>
            <td class="py-4 px-6">{{ data.food_description }}</td>
            <td class="py-4 px-6">{{ data.timestamp }}</td>
            <td class="py-4 px-6">{{ data.uid }}</td>
            <td class="ppy-4 px-6 text-right">
              <div class="inline-flex">
                <a
                  class="text-blue-600 hover:text-blue-900 ml-4"
                  @click="openEditHistoryModal(data)"
                >
                  Edit
                </a>
                <a
                  class="text-red-600 hover:text-red-900 ml-4"
                  @click="removeHistory(data)"
                >
                  Remove
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="isEditModalOpened"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl z-10 max-w-md">
        <h3 class="mb-6">Edit Donation History</h3>

        <!-- Form for completing appointment -->
        <div>
          <div>
            <label class="text-sm font-medium text-gray-700">Type</label>
            <input
              v-model="selected_data.type"
              type="text"
              class="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">Amount</label>
            <input
              v-model="selected_data.amount"
              type="text"
              class="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div class="mb-4">
            <label class="text-sm font-medium text-gray-700"
              >Food Description</label
            >
            <input
              v-model="selected_data.food_description"
              type="text"
              class="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="closeEditHistoryModal"
              class="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            <!-- Complete Button -->
            <button
              type="submit"
              class="bg-green-500 text-white py-2 px-4 rounded"
              @click="submitUpdate"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      donations: [],
      selected_data: null,
      isEditModalOpened: false,
    };
  },
  methods: {
    openEditHistoryModal(data) {
      this.selected_data = { ...data };
      this.toggleEditModal();
    },
    closeEditHistoryModal() {
      this.selected_data = null;
      this.toggleEditModal();
    },
    toggleEditModal() {
      this.isEditModalOpened = !this.isEditModalOpened;
    },
    async submitUpdate() {
      const isConfirmed = window.confirm(
        "Are you sure you want to update this record?"
      );

      try {
        if (isConfirmed) {
          const response = await this.axios.post(
            `${this.$api}/donation/${this.selected_data.did}/update`,
            {
              type: this.selected_data.type,
              amount: this.selected_data.amount,
              food_description: this.selected_data.food_description,
            },
            {
              headers: {
                Authorization: this.user.token,
              },
            }
          );
          alert(response.data.message);
          console.log(response.data);
        } else {
          this.closeEditHistoryModal();
          return;
        }
      } catch (error) {
        console.error("Error Updating:", error);
      }
      // close
      this.closeEditHistoryModal();
      // refresh
      this.refreshPage();
    },
    refreshPage() {
      location.reload();
    },
    async fetchDonationHistory() {
      try {
        const response = await this.axios.get(`${this.$api}/donation/all/`, {
          headers: {
            Authorization: this.user.token,
          },
        });

        this.donations = response.data;
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    },
    async removeHistory(data) {
      const isConfirmed = window.confirm(
        "Are you sure you want to remove this record?"
      );

      try {
        if (isConfirmed) {
          const res = await this.axios.delete(
            this.$api + `/donation/${data.did}/delete`,
            {
              headers: {
                Authorization: this.user.token,
              },
            }
          );
          alert(res.data.message);
          this.refreshPage();
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
  async mounted() {
    await this.fetchDonationHistory();
  },
};
</script>
