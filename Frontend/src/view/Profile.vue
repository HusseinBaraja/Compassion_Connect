<template>
  <section class="bg-coolGray-50 py-4">
    <div class="container px-4 mx-auto">
      <div
        class="p-6 h-full border border-coolGray-100 overflow-hidden bg-white rounded-md shadow-dashboard"
      >
        <div class="pb-6 border-b border-coolGray-100">
          <div class="flex flex-wrap items-center justify-between -m-2">
            <div class="w-full md:w-auto p-2">
              <h2 class="text-coolGray-900 text-lg font-semibold">
                Personal info
              </h2>
            </div>
            <div class="w-full md:w-auto p-2">
              <div class="flex flex-wrap justify-between -m-1.5">
                <div class="w-full md:w-auto p-1.5">
                  <button
                    class="flex flex-wrap justify-center w-full px-4 py-2 font-medium text-sm text-coolGray-500 hover:text-coolGray-600 border border-coolGray-200 hover:border-coolGray-300 bg-white rounded-md shadow-button"
                  >
                    <p>Cancel</p>
                  </button>
                </div>
                <div class="w-full md:w-auto p-1.5">
                  <button
                    @click.prevent="updateUserData"
                    class="flex flex-wrap justify-center w-full px-4 py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button"
                  >
                    <p>Save</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="py-6 border-b border-coolGray-100">
          <div class="w-full md:w-9/12">
            <div class="flex flex-wrap -m-3">
              <div class="w-full md:w-1/3 p-3">
                <p class="text-sm text-coolGray-800 font-semibold">
                  Email address
                </p>
              </div>
              <div class="w-full md:flex-1 p-3">
                <input
                  class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                  type="email"
                  placeholder="johndoe@flex.co"
                  v-model="profileData.email"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="py-6 border-b border-coolGray-100">
          <div class="w-full md:w-9/12">
            <div class="flex flex-wrap -m-3">
              <div class="w-full md:w-1/3 p-3">
                <p class="text-sm text-coolGray-800 font-semibold">Password</p>
              </div>
              <div class="w-full md:flex-1 p-3">
                <input
                  class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                  type="password"
                  placeholder="*****************"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="py-6 border-b border-coolGray-100">
          <div class="w-full md:w-9/12">
            <div class="flex flex-wrap -m-3">
              <div class="w-full md:w-1/3 p-3">
                <p class="text-sm text-coolGray-800 font-semibold">
                  Phone Number
                </p>
              </div>
              <div class="w-full md:flex-1 p-3">
                <input
                  class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                  type="phone"
                  placeholder="+60 X XXX XXXX"
                  v-model="profileData.phone"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="py-6 border-b border-coolGray-100">
          <div class="w-full md:w-9/12">
            <div class="flex flex-wrap -m-3">
              <div class="w-full md:w-1/3 p-3">
                <p class="text-sm text-coolGray-800 font-semibold">
                  IC / Passport Number
                </p>
              </div>
              <div class="w-full md:flex-1 p-3">
                <input
                  class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                  type="text"
                  placeholder="XXXXXXXXX"
                  v-model="profileData.ic_ppno"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="py-6 border-b border-coolGray-100">
          <div class="w-full md:w-9/12">
            <div class="flex flex-wrap -m-3">
              <div class="w-full md:w-1/3 p-3">
                <p class="text-sm text-coolGray-800 font-semibold">Address</p>
              </div>
              <div class="w-full md:flex-1 p-3">
                <div class="relative">
                  <svg
                    class="absolute right-4 top-1/2 transform -translate-y-1/2"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z"
                      fill="#8896AB"
                    ></path>
                  </svg>
                  <select
                    class="appearance-none w-full py-2.5 px-4 text-coolGray-900 text-base font-normal bg-white border outline-none border-coolGray-200 focus:border-green-500 rounded-lg shadow-input"
                    v-model="profileData.address_id"
                  >
                    <option
                      :value="index"
                      class="text-gray-800"
                      v-for="(loc, index) in addresses"
                      :key="index"
                    >
                      {{ loc }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="py-6 border-b border-coolGray-100">
          <div class="w-full md:w-9/12">
            <div class="flex flex-wrap -m-3">
              <div class="w-full md:w-1/3 p-3">
                <p class="text-sm text-coolGray-800 font-semibold">
                  Delete Account
                </p>
              </div>
              <div class="w-full md:flex-1 p-3">
                <button
                  @click.prevent="deleteUserAccount"
                  class="bg-red-600 hover:bg-red-700 text-white w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      user: null,
      profileData: {
        email: "",
        password: "",
        phone: "",
        ic_ppno: "",
        address_id: "",
      },
      addresses: [
        "Johor",
        "Kedah",
        "Kelantan",
        "Malacca",
        "Negeri Sembilan",
        "Pahang",
        "Perak",
        "Perlis",
        "Penang",
        "Sabah",
        "Sarawak",
        "Selangor",
        "Terengganu",
        "Kuala Lumpur",
        "Labuan",
        "Putrajaya",
      ],
    };
  },
  methods: {
    async getUser() {
      return await JSON.parse(localStorage.getItem("user"));
    },
    // Get Data of specific User
    async fetchUserData() {
      try {
        const userId = this.user.uid; // Assuming you have a user object in localStorage
        const res = await axios.get(
          `${this.$api}/user-data/${userId}/profile`,
          {
            headers: {
              Authorization: this.user.token,
            },
          }
        );

        // Map the retrieved data to your profileData object
        const formattedProfile = res.data.map((userData) => ({
          email: userData.email,
          phone: userData.phone,
          ic_ppno: userData.ic_ppno,
          address_id: userData.address_id,
        }));
        this.profileData = formattedProfile[0];
        console.log(this.profileData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    // Update Data of Specific User
    async updateUserData() {
      try {
        // Check if any of the required fields is empty
        if (
          !this.profileData.email ||
          !this.profileData.phone ||
          !this.profileData.ic_ppno
        ) {
          console.error("Please fill in all required fields");
          return;
        }
        console.log(this.profileData.address_id);
        // Convert address to id

        console.log(this.profileData.address_id);

        const userId = this.user.uid;
        const res = await axios.put(
          `${this.$api}/user-data/${userId}/profile/update`,
          this.profileData,
          {
            headers: {
              Authorization: this.user.token,
            },
          }
        );

        this.refereshPage();

        console.log(res.data);
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    },

    // Delete Data of Specific User
    async deleteUserAccount() {
      if (await confirm("Are you sure you want to delete the account? ")) {
        try {
          const userId = this.user.uid;
          const res = await axios.delete(
            `${this.$api}/user-data/${userId}/delete`,
            {
              headers: {
                Authorization: this.user.token,
              },
            }
          );
          localStorage.setItem("user", JSON.stringify({}));
          this.$emit("logout", true);
          this.$router.push("/login");
        } catch (error) {
          console.error("Error updating user data:", error);
        }
      }
    },
    refereshPage() {
      location.reload();
    },
  },

  async mounted() {
    this.user = await this.getUser();
    this.fetchUserData();
  },
};
</script>
