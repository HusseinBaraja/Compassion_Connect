<template>
  <div
    class="p-4 bg-gradient-to-r from-[#C6C7C4] via-[#A2999E] to-[#846A6A] h-screen"
  >
    <div class="p-4">
      <div class="dashboard-area bg-[#EEF0F2] p-5 rounded-lg shadow-md mb-6">
        <h2 class="text-2xl font-bold text-gray-700 mb-3">Appointments</h2>
        <p class="font-medium text-gray-600 mb-2">Upcoming Appointments:</p>
        <ul>
          <li
            v-for="appointment in upcomingAppointments"
            :key="appointment.date"
            class="bg-white p-2 rounded-md shadow-sm mb-2"
          >
            <span class="text-gray-800 font-semibold">{{
              appointment.date
            }}</span>
            - <span class="text-gray-600">{{ appointment.location }}</span>
          </li>
        </ul>
      </div>
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-[#EEF0F2]">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date & Time
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(appointment, index) in appointments" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ appointment.date }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ appointment.location }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                      >
                        {{ appointment.type }}
                      </span>
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
                        href="#"
                        class="text-indigo-600 hover:text-indigo-900"
                        @click="viewDetails(appointment)"
                        >View</a
                      >
                      <a
                        href="#"
                        class="text-red-600 hover:text-red-900 ml-4"
                        @click="cancelAppointment(index)"
                        >Cancel</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppointmentList",
  data() {
    return {
      appointments: [
        {
          date: "2023-11-15 10:00",
          location: "Food Bank A",
          type: "Food",
          status: "Scheduled",
        },
        {
          date: "2023-11-16 14:30",
          location: "Shelter B",
          type: "Money",
          status: "Confirmed",
        },
        {
          date: "2023-11-17 09:00",
          location: "Food Bank C",
          type: "Food",
          status: "Pending",
        },
        {
          date: "2023-11-18 16:00",
          location: "Shelter D",
          type: "Food",
          status: "Completed",
        },
      ],
    };
  },
  computed: {
    upcomingAppointments() {
      const today = new Date();
      return this.appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate > today && appointment.status === "Confirmed";
      });
    },
  },
  methods: {
    viewDetails(appointment) {
      // Logic to view appointment details
      console.log("Viewing details for:", appointment);
    },
    cancelAppointment(index) {
      // Logic to cancel appointment
      // This could be a call to an API to delete the appointment from the server
      const confirmed = confirm(
        "Are you sure you want to cancel this appointment?"
      );
      if (confirmed) {
        this.appointments.splice(index, 1);
        console.log("Appointment cancelled");
      }
    },
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
