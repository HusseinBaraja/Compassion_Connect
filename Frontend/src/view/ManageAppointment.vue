<template>
  <div
    class="h-screen p-4 bg-gradient-to-r from-[#A2999E] via-[#846A6A] to-[#353B3C]"
  >
    <div class="p-4">
      <div class="dashboard-area bg-[#C6C7C4] p-5 rounded-lg shadow-md mb-6">
        <h2 class="text-2xl font-bold text-gray-700 mb-3">
          Manage Appointments
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

      <!-- Appointments Table -->
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-hidden py-2 sm:-mx-6 lg:-mx-8">
          <div
            class="overflow-x-hidden py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="w-full divide-y divide-gray-200">
                <!-- Table Header -->
                <thead class="bg-[#EEF0F2]">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Appointment ID
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Date & Time
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Location
                    </th>

                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="py-3 text-center text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <!-- Table Body -->
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="(appointment, index) in filteredAppointments"
                    :key="index"
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-center">
                      <div class="text-sm text-gray-900">
                        {{ appointment.aid }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ formatISODate(appointment.timestamp) }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ appointment.location }}
                      </div>
                    </td>

                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ appointment.status }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                    >
                      <a
                        class="text-indigo-600 hover:text-indigo-900"
                        @click="viewDetails(appointment)"
                        >View</a
                      >
                      <a
                        class="text-blue-600 hover:text-blue-900 ml-4"
                        @click="openUpdateModal(appointment)"
                        v-if="appointment.status.toLowerCase() !== 'completed'"
                      >
                        Update
                      </a>
                      <a
                        class="text-red-600 hover:text-red-900 ml-4"
                        @click="removeAppointment(appointment)"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal for Appointment Details -->
      <div
        v-if="selectedAppointment"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-gray-800 opacity-75"
          @click="closeDetails"
        ></div>
        <div
          class="bg-white p-6 font-normal rounded-lg shadow-xl z-10 max-w-md relative"
        >
          <button
            @click="closeDetails"
            class="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <h2 class="text-2xl mb-4">Appointment Details</h2>
          <div class="grid grid-cols-2 gap-2">
            <strong>Appointment ID</strong>
            {{ selectedAppointment.aid }}
          </div>
          <div class="grid grid-cols-2 gap-2">
            <strong>Donor ID</strong>
            {{ selectedAppointment.uid }}
          </div>
          <div class="grid grid-cols-2 gap-2">
            <strong>Donor Phone Number</strong>
            {{ selectedAppointment.donor.phone }}
          </div>
          <div class="grid grid-cols-2 gap-2">
            <strong>Drop-off Location</strong>
            {{ selectedAppointment.location }}
          </div>
          <div class="grid grid-cols-2 gap-2">
            <strong>Date and Time</strong>
            {{ formatISODate(selectedAppointment.timestamp) }}
          </div>
          <div class="grid grid-cols-2 gap-2">
            <strong>Status</strong>
            {{ selectedAppointment.status }}
          </div>
        </div>
      </div>

      <!-- Update Appointment Modal -->
      <div
        v-if="isUpdateModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-gray-800 opacity-75"
          @click="closeUpdateModal"
        ></div>
        <div class="bg-white p-6 rounded-lg shadow-xl z-10 max-w-md">
          <button
            @click="closeUpdateModal"
            class="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <h2 class="text-2xl font-bold mb-4">Complete Appointment</h2>
          <!-- Form for completing appointment -->
          <form @submit.prevent="submitCompletedAppointment">
            <!-- Food Description -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700"
                >Food Description</label
              >
              <input
                v-model="updatedAppointment.food_description"
                type="text"
                class="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <!-- Buttons -->
            <div class="flex justify-end">
              <!-- Complete Button -->
              <button
                type="submit"
                class="bg-green-500 text-white py-2 px-4 rounded mr-2"
              >
                Complete
              </button>

              <!-- Cancel Button -->
              <button
                type="button"
                @click="closeUpdateModal"
                class="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppointmentList",
  data() {
    return {
      appointments: [], // Initialize appointments as an empty array
      updatedAppointment: {
        id: null,
        date: null,
        location: null,
        type: null,
        donor: null,
        status: "Completed",
      },
      searchTerm: "",
      activeFilter: null,
      selectedAppointment: null,
      isUpdateModalOpen: false,
    };
  },
  computed: {
    filteredAppointments() {
      const filtered = this.appointments.filter((appointment) => {
        const statusMatch =
          !this.activeFilter || appointment.status === this.activeFilter;
        const searchMatch = appointment.location
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
    toggleFilter(filter) {
      this.activeFilter = this.activeFilter === filter ? null : filter;
    },
    // View details method
    viewDetails(appointment) {
      this.selectedAppointment = appointment;
    },
    // Close details method
    closeDetails() {
      this.selectedAppointment = null;
    },
    // Open update modal method
    openUpdateModal(appointment) {
      this.updatedAppointment = { ...appointment };
      this.isUpdateModalOpen = true;
    },
    // Close update modal method
    closeUpdateModal() {
      this.isUpdateModalOpen = false;
    },
    refreshPage() {
      location.reload();
    },
    async removeAppointment(a) {
      const isConfirmed = window.confirm(
        "Are you sure you want to remove this appointment?"
      );

      try {
        if (isConfirmed) {
          console.log(this.$api + `/appointment/${a.aid}/delete`);
          const res = await this.axios.delete(
            this.$api + `/appointment/${a.aid}/delete`,
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
    // Submit completed appointment method
    async submitCompletedAppointment() {
      // Display a confirmation pop-up
      const isConfirmed = window.confirm(
        "Are you sure you want to complete this appointment?"
      );

      // If the user confirms, proceed with completing the appointment
      if (isConfirmed) {
        // Validation of the completed appointment data

        // Connect to API by sending the latest data if validation passed

        // Update the status to "Completed"
        this.updatedAppointment.status = "Completed";

        if (this.updatedAppointment.food_description) {
          const res = await this.axios.post(
            this.$api + `/appointment/${this.updatedAppointment.aid}/update`,
            {
              status: "Completed",
              food_description: this.updatedAppointment.food_description,
              uid: this.updatedAppointment.uid,
            },
            {
              headers: {
                Authorization: this.user.token,
              },
            }
          );

          alert(res.data.message);

          const res_rew = await this.axios.post(
            this.$api + `/user-data/${this.user.uid}/addpoint`,
            { point: parseInt(30) },
            { headers: { Authorization: this.user.token } }
          );

          // Check if res_rew.data.message is defined before alerting
          if (res_rew.data) {
            alert(res_rew.data.message);
          } else {
            // Handle the case where res_rew.data.message is undefined
            console.error("Undefined message in res_rew.data");
          }
        }

        // Close the update modal
        this.closeUpdateModal();
        this.refreshPage();
      }
    },
    formatISODate(isoDateString) {
      const date = new Date(isoDateString);

      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
      const yyyy = date.getFullYear();
      const hh = String(date.getHours()).padStart(2, "0");
      const min = String(date.getMinutes()).padStart(2, "0");
      const ss = String(date.getSeconds()).padStart(2, "0");

      return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
    },
    async fetchDonorDetails(donorId) {
      try {
        const response = await axios.get(`${this.$api}/user-data/${donorId}`, {
          headers: {
            Authorization: this.user.token,
          },
        });

        return response.data[0]; // Return donor details
      } catch (error) {
        console.error("Error fetching donor details:", error);
        throw error;
      }
    },
    // Updated fetchAppointments method
    async fetchAppointments() {
      try {
        const response = await axios.get(`${this.$api}/appointment/all/`);

        const fetchedAppointments = response.data;
        await fetchedAppointments.forEach(async (a) => {
          a.donor = await this.fetchDonorDetails(a.uid);
        });

        this.appointments = fetchedAppointments;
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    },
  },
  mounted() {
    this.fetchAppointments();
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
