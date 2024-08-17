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
                                    to="/manageappointment"
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
                                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Manage Appointment</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/managedonation"
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
                                                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Manage Donation History</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/manageinfo"
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
                                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Manage Information Site</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/managefeedback"
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
                                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Manage Feedback</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/managerewardhistory"
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
                                                d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Manage Reward History</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/managereward"
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
                                                d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 004.875-4.875V12m6.375 5.25a4.875 4.875 0 01-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v13.5a1.5 1.5 0 001.5 1.5zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 013.182 3.182zM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 113.182-3.182z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Manage Reward</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/generatereport"
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
                                                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Analysis</span>
                                </router-link>
                            </li>
                            <li></li>
                        </ul>

                        <div class="pt-2">
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
                                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                        />
                                    </svg>
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
