<script>
import DonationReceipt from "./components/DonationReceipt.vue";
import Footer from "./components/Footer.vue";
export default {
    name: "App",
    components: { DonationReceipt, "app-footer": Footer },
    data() {
        return {
            is_logged_out: false,
            user: null,
        };
    },
    computed: {
        isUserNavBar() {
            return this.user && !this.user.is_admin && !this.is_logged_out;
        },
        isAdminNavBar() {
            return this.user && this.user.is_admin && !this.is_logged_out;
        },
    },
    methods: {
        updateStatus(e) {
            this.is_logged_out = e;
        },
        updateUser(e) {
            console.log(e);
            this.user = e;
            this.is_logged_out = false;
        },
    },
    async mounted() {
        if (!this.user)
            this.user = await JSON.parse(localStorage.getItem("user"));
    },
};
</script>

<template>
    <div class="overflow-x-hidden">
        <NavBar v-if="isUserNavBar" @logout="updateStatus"></NavBar>

        <NavBarAdmin v-if="isAdminNavBar" @logout="updateStatus"></NavBarAdmin>

        <router-view
            class="p-8 text-[#353B3C] font-extrabold"
            @login="updateUser"
        ></router-view>
    </div>
</template>

<style>
/* width */
::-webkit-scrollbar {
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
