<!-- DetailedAppointmentModal.vue -->
<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    v-show="showModal"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="document"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Appointment Details
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Date & Time: {{ details.date }}
                </p>
                <p class="text-sm text-gray-500">
                  Location: {{ details.location }}
                </p>
                <p class="text-sm text-gray-500">Type: {{ details.type }}</p>
                <p class="text-sm text-gray-500">
                  Status: {{ details.status }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            @click="closeModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailedAppointmentModal",
  props: {
    showModal: Boolean,
    details: Object,
  },
  methods: {
    closeModal() {
      this.$emit("update:showModal", false);
    },
  },
};
</script>
