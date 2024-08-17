<template>
    <div>
        <section class="relative overflow-hidden">
            <div class="relative flex flex-wrap">
                <div
                    class="w-full lg:w-9/12 xl:w-2/3 relative bg-[#A2999E] pt-24 pb-64 lg:py-32 h-full lg:min-h-screen flex items-center"
                >
                    <img
                        class="absolute top-0 left-0"
                        src="../assets/circle.png"
                        alt=""
                    />
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Pellentesque massa nibh, pulvinar vitae
                            aliquet nec, accumsan aliquet orci.
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
                                    SIGN IN
                                </p>
                                <h1
                                    class="font-heading font-semibold text-4xl text-rhino-700 text-center mb-8"
                                >
                                    Join our community
                                </h1>
                                <input
                                    class="py-3 px-4 border border-coolGray-200 rounded-sm text-coolGray-400 bg-white mb-4 w-full outline-none focus:ring-1 ring-indigo-400"
                                    type="text"
                                    placeholder="Email Address"
                                    v-model="sign_in.email"
                                />
                                <input
                                    class="py-3 px-4 border border-coolGray-200 rounded-sm text-coolGray-400 bg-white mb-8 w-full outline-none focus:ring-1 ring-indigo-400"
                                    type="password"
                                    placeholder="Password"
                                    v-model="sign_in.password"
                                />
                                <a
                                    class="rounded-sm py-3 px-4 bg-[#353B3C] shadow-md text-white font-medium text-sm w-full mb-4 block text-center hover:bg-gray-600 transition duration-200"
                                    @click="signIn"
                                    >Sign In</a
                                >

                                <div class="w-full p-3">
                                    <p
                                        class="text-rhino-300 text-center text-sm"
                                    >
                                        <span>Don’t have an account? </span
                                        ><a
                                            class="text-blue-500 hover:text-blue-600 cursor-pointer"
                                            @click.prevent="redirectToRegister"
                                            >Sign Up</a
                                        >
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sign_in: {
                email: null,
                password: null,
            },
            api: null,
        };
    },
    methods: {
        redirectToRegister() {
            this.$router.push("/register");
        },
        async signIn() {
            const res = await this.axios.post(
                this.$api + "/signin",
                this.sign_in
            );
            const data = res.data;
            if (!data) {
                alert("Authentication failed");
                return;
            }

            const userData = {
                uid: data.uid,
                token: data.token,
                is_admin: data.is_admin,
            };

            await localStorage.setItem("user", JSON.stringify(userData));
            this.$emit("login", JSON.parse(localStorage.getItem("user")));
            this.$router.push({
                name: "home",
            });
        },
    },
};
</script>
