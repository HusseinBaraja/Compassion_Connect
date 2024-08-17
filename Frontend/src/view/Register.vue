<template>
  <section class="relative overflow-hidden">
    <div class="relative flex flex-wrap">
      <div
        class="w-full lg:w-9/12 xl:w-2/3 relative bg-[#A2999E] pt-24 pb-64 lg:py-32 h-full lg:min-h-screen flex items-center"
      >
        <img class="absolute top-0 left-0" src="../assets/circle.png" alt="" />
        <img
          class="absolute right-0 top-0 h-full"
          src="../assets/image.png"
          alt=""
        />
        <div
          class="relative z-10 px-4 mx-auto lg:ml-12 xl:mr-0 xl:ml-20 max-w-md xl:max-w-lg"
        >
          <h1
            class="text-white text-4xl xl:text-5xl font-semibold mb-9 font-heading max-w-lg"
          >
            Compassion Connect
          </h1>
          <p class="text-[#EEF0F2] max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque massa nibh, pulvinar vitae aliquet nec, accumsan
            aliquet orci.
          </p>
        </div>
      </div>
      <div
        class="relative w-full lg:w-3/12 xl:w-1/3 px-4 lg:min-h-screen bg-white"
      >
        <div
          class="lg:absolute top-0 right-0 w-full h-full py-12 lg:py-0 max-w-lg lg:max-w-none mx-auto -mt-40 lg:-mt-0 lg:mx-0 lg:min-w-max flex items-center z-50"
        >
          <div
            class="transform lg:-ml-64 xl:-ml-0 xl:-translate-x-1/2 lg:max-w-md bg-[#EEF0F2] rounded-lg py-12 px-6 lg:px-8"
          >
            <form action="">
              <p
                class="uppercase text-rhino-300 text-xs font-bold tracking-widest mb-1 text-center"
              >
                SIGN UP
              </p>
              <h1
                class="font-heading font-semibold text-4xl text-rhino-700 text-center mb-8"
              >
                Create new account
              </h1>

              <input
                class="py-3 px-4 rounded-sm border border-coolGray-200 bg-white mb-4 w-full outline-none focus:ring-1 ring-indigo-400"
                type="email"
                placeholder="Email Address"
                v-model="registration.email"
              />
              <input
                class="py-3 px-4 rounded-sm border border-coolGray-200 bg-white mb-4 w-full outline-none focus:ring-1 ring-indigo-400"
                type="phone"
                placeholder="Phone No."
                v-model="registration.phone"
              />
              <input
                class="py-3 px-4 rounded-sm border border-coolGray-200 bg-white mb-4 w-full outline-none focus:ring-1 ring-indigo-400"
                type="text"
                placeholder="IC / Passport No."
                v-model="registration.ic_ppno"
              />
              <input
                class="py-3 px-4 rounded-sm border border-coolGray-200 bg-white mb-4 w-full outline-none focus:ring-1 ring-indigo-400"
                type="password"
                placeholder="Password"
                v-model="registration.password"
              />

              <select
                class="py-3 px-3 rounded-sm border border-coolGray-200 bg-white mb-8 w-full outline-none focus:ring-1 ring-indigo-400"
                v-model="registration.address_id"
              >
                <option value="" disabled selected>
                  Select Your Residential Location
                </option>

                <option
                  :value="`${loc}`"
                  class="text-gray-800"
                  v-for="loc in addresses"
                  :key="loc.id"
                >
                  {{ loc }}
                </option>
              </select>
              <div class="flex items-center gap-3 mb-8">
                <div class="relative">
                  <input
                    class="custom-checkbox-1 absolute z-10 h-5 w-5 top-0 left-0"
                    id="checkbox1"
                    type="checkbox"
                    v-model="terms_checked"
                  />
                  <div
                    class="border border-coolGray-200 w-5 h-5 flex justify-center items-center rounded-sm bg-white"
                  >
                    <svg
                      class="hidden"
                      width="10"
                      height="7"
                      viewBox="0 0 10 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.76764 0.22597C9.45824 -0.0754185 8.95582 -0.0752285 8.64601 0.22597L3.59787 5.13702L1.35419 2.95437C1.04438 2.65298 0.542174 2.65298 0.23236 2.95437C-0.0774534 3.25576 -0.0774534 3.74431 0.23236 4.0457L3.03684 6.77391C3.19165 6.92451 3.39464 7 3.59765 7C3.80067 7 4.00386 6.9247 4.15867 6.77391L9.76764 1.31727C10.0775 1.01609 10.0775 0.52734 9.76764 0.22597Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
                <label class="block text-rhino-300 text-sm" for="checkbox1">
                  <span>By signing up, you agree to our</span>
                  <span class="text-rhino-700">
                    Terms, Data Policy and Cookies Policy.</span
                  >
                </label>
              </div>
              <a
                class="rounded-sm py-3 px-4 bg-[#353B3C] shadow-md text-white font-medium text-sm w-full mb-4 block text-center hover:bg-gray-600 transition duration-200"
                href="#"
                @click="signUp"
                >Sign Up</a
              >

              <div class="w-full p-3">
                <a class="group text-sm text-center block" href="#">
                  <span
                    class="text-rhino-300 group-hover:text-rhino-400 transition duration-200"
                    >Already have an account?</span
                  >
                  <span
                    class="text-blue-500 group-hover:text-blue-600 transition duration-200"
                    @click.prevent="redirectToLogin"
                  >
                    Sign In</span
                  >
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      registration: {
        email: null,
        password: null,
        phone: null,
        ic_ppno: null,
        address_id: "",
      },
      terms_checked: false,
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
    redirectToLogin() {
      this.$router.push("/login");
    },
    async signUp() {
      // Null value not acceptable
      if (
        Object.values(this.registration).includes(null) ||
        !this.terms_checked
      )
        return;

      // Convert address to id
      this.registration.address_id =
        this.addresses.indexOf(this.registration.address_id) + 1;

      try {
        const res = await this.axios.post(
          this.$api + "/signup",
          this.registration
        );

        if (res.data) {
          alert("Succesful Registration");
          this, this.redirectToLogin();
        } else {
          alert("Registration Failed");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
