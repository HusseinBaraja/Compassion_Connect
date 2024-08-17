<template>
    <div class="">
        <div>
            <nav class="p-2 border-b">
                <div class="w-full flex items-center justify-between">
                    <img
                        class="h-10"
                        src="../assets/result-removebg.png"
                        alt=""
                        width="auto"
                    />

                    <button
                        class="navbar-burger flex items-center rounded focus:outline-none"
                    >
                        <svg
                            class="text-white bg-[#846A6A] block h-8 w-8 p-2 rounded"
                            viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            @click="toggleSidebar"
                        >
                            <title>Mobile menu</title>
                            <path
                                d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                            ></path>
                        </svg>
                    </button>
                </div>
            </nav>
            <div class="navbar-menu relative z-50" v-if="is_expanding">
                <!-- background while expanding -->
                <div
                    class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-50"
                    @click="toggleSidebar"
                ></div>

                <!-- Sidebar items -->
                <nav
                    class="fixed top-0 left-0 bottom-0 flex flex-col w-3/4 lg:w-80 sm:max-w-xs pb-8 overflow-y-auto bg-[#846A6A]"
                >
                    <div
                        class="flex w-full items-center px-4 lg:border-b border-blue-50 text-white"
                    >
                        <a class="text-xl font-semibold" href="#">
                            <img
                                class="h-20 w-auto"
                                src="../assets/result-removebg.png"
                                alt=""
                            />
                        </a>
                        <span class="pl-3"> Compassion Connect </span>
                    </div>
                    <div class="px-4 pb-6 pt-6">
                        <h3
                            class="mb-2 text-xs uppercase text-white font-medium"
                        >
                            Main
                        </h3>
                        <ul class="mb-8 text-sm font-medium">
                            <li>
                                <router-link
                                    to="/home"
                                    class="flex items-center pl-3 py-3 pr-4 text-white hover:bg-[#A2999E] rounded"
                                >
                                    <span class="inline-block mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                            />
                                        </svg>
                                    </span>
                                    <span>Home</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/donation"
                                    class="flex items-center pl-3 py-3 pr-2 text-white hover:bg-[#A2999E] rounded"
                                >
                                    <span class="inline-block mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Donate</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/viewinfo"
                                    class="flex items-center pl-3 py-3 pr-4 text-white hover:bg-[#A2999E] rounded"
                                    href="#"
                                >
                                    <span class="inline-block mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Info</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/feedback"
                                    class="flex items-center pl-3 py-3 pr-4 text-white hover:bg-[#A2999E] rounded"
                                >
                                    <span class="inline-block mr-3">
                                        <!-- <add the icon> -->
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Feedback</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/reward"
                                    class="flex items-center pl-3 py-3 pr-4 text-white hover:bg-[#A2999E] rounded"
                                >
                                    <span class="inline-block mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Reward</span>
                                </router-link>
                            </li>
                            <li></li>
                        </ul>
                        <h3
                            class="mb-2 text-xs uppercase text-white font-medium"
                        >
                            Secondary
                        </h3>
                        <ul class="text-sm font-medium">
                            <li>
                                <router-link
                                    to="/donationhistory"
                                    class="flex items-center pl-3 py-3 pr-2 text-white hover:bg-[#A2999E] rounded"
                                >
                                    <span class="inline-block mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Donation History</span>
                                </router-link>
                            </li>
                        </ul>
                        <div class="pt-8">
                            <router-link
                                to="/profile"
                                class="flex items-center pl-3 py-3 pr-2 text-white hover:bg-[#A2999E] rounded"
                            >
                                <span class="inline-block mr-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </span>
                                <span>Profile</span>
                            </router-link>
                            <a
                                class="flex items-center pl-3 py-3 pr-2 text-white hover:bg-[#A2999E] rounded"
                                @click="logout"
                            >
                                <span class="inline-block mr-4">
                                    <!-- <add logout icon> -->
                                </span>
                                <span>Log Out</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    setup() {
        // Add any setup logic if needed
        const showNavBar = ref(false);

        return {
            showNavBar,
        };
    },
    data() {
        return {
            is_expanding: false,
        };
    },
    methods: {
        // Use router.push to navigate to different pages
        changePage(page) {
            this.$router.push({ path: `/${page.toLowerCase()}` });
        },
        toggleSidebar() {
            this.is_expanding = !this.is_expanding;
        },
        logout() {
            localStorage.setItem("user", JSON.stringify({}));
            this.$emit("logout", true);
            this.changePage("login");
        },
    },
    mounted() {
        // Burger menus
        document.addEventListener("DOMContentLoaded", function () {
            // open
            const burger = document.querySelectorAll(".navbar-burger");
            const menu = document.querySelectorAll(".navbar-menu");

            if (burger.length && menu.length) {
                for (var i = 0; i < burger.length; i++) {
                    burger[i].addEventListener("click", function () {
                        for (var j = 0; j < menu.length; j++) {
                            menu[j].classList.toggle("hidden");
                        }
                    });
                }
            }

            // close
            const close = document.querySelectorAll(".navbar-close");
            const backdrop = document.querySelectorAll(".navbar-backdrop");

            if (close.length) {
                for (var i = 0; i < close.length; i++) {
                    close[i].addEventListener("click", function () {
                        for (var j = 0; j < menu.length; j++) {
                            menu[j].classList.toggle("hidden");
                        }
                    });
                }
            }

            if (backdrop.length) {
                for (var i = 0; i < backdrop.length; i++) {
                    backdrop[i].addEventListener("click", function () {
                        for (var j = 0; j < menu.length; j++) {
                            menu[j].classList.toggle("hidden");
                        }
                    });
                }
            }
        });
    },
};
</script>
