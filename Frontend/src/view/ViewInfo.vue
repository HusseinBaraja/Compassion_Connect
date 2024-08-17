<template>
  <section
    class="h-screen bg-gradient-to-r from-[#C6C7C4] via-[#A2999E] to-[#846A6A] overflow-hidden"
  >
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        <h2
          class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-353B3C dark:text-white"
        >
          Information Site
        </h2>
        <p class="font-light text-353B3C sm:text-xl dark:text-353B3C">
          Keep updated with recent events and articles!
        </p>
      </div>
      <!-- Blog Cards -->
      <div
        class="grid gap-8 lg:grid-cols-1 h-full max-h-[500px] overflow-y-auto p-2"
      >
        <article
          v-for="(blog, index) in blogs"
          :key="index"
          @click="openBlogModal(blog)"
          class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-[#C6C7C4] dark:border-[#C6C7C4] cursor-pointer"
        >
          <div class="flex justify-between items-center mb-5 text-[#353B3C]">
            <span
              class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800"
            >
              <svg
                class="mr-1 w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
                ></path>
              </svg>
              {{ blog.category }}
            </span>
            <span class="text-sm">{{ blog.date }}</span>
          </div>
          <h2
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-[#353B3C]"
          >
            <a href="#">{{ blog.title }}</a>
          </h2>
          <p
            class="mb-5 font-light text-[#C6C7C4] dark:text-[#353B3C] truncate"
          >
            {{ blog.shortDescription }}
          </p>
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
              <img
                class="w-7 h-7 rounded-full"
                :src="blog.author.avatar"
                :alt="`${blog.author.name} avatar`"
              />
              <span class="font-medium dark:text-[#353B3C]">{{
                blog.author.name
              }}</span>
            </div>
            <a
              href="#"
              class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
            >
              Read more
              <svg
                class="ml-2 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </article>
      </div>
    </div>

    <!-- Blog Modal -->
    <div
      v-if="selectedBlog"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none mx-auto lg:ml-80"
    >
      <div class="relative max-w-3xl mx-auto my-6">
        <!-- Modal Content -->
        <div
          class="relative bg-white dark:bg-[#EEF0F2] dark:border-[#EEF0F2] rounded-lg shadow-xl"
        >
          <!-- Close Button -->
          <button
            @click="selectedBlog = null"
            class="absolute top-0 right-0 p-4 text-gray-700 dark:text-[#353B3C] cursor-pointer"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <!-- Modal Content -->
          <div class="p-6">
            <h2 class="text-2xl font-bold mb-4">
              {{ selectedBlog.title }}
            </h2>
            <div class="flex justify-between items-center mb-5 text-[#353B3C]">
              <span
                class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800"
              >
                <svg
                  class="mr-1 w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                    clip-rule="evenodd"
                  ></path>
                  <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
                </svg>
                {{ selectedBlog.category }}
              </span>
              <span class="text-sm">{{ selectedBlog.date }}</span>
            </div>
            <p class="text-[#353B3C] dark:text-[#353B3C] text-justify">
              {{ selectedBlog.content }}
            </p>
            <div class="flex justify-between items-center mt-4">
              <div class="flex items-center space-x-4">
                <img
                  class="w-7 h-7 rounded-full"
                  :src="selectedBlog.author.avatar"
                  :alt="`${selectedBlog.author.name} avatar`"
                />
                <span class="font-medium dark:text-[#353B3C]">{{
                  selectedBlog.author.name
                }}</span>
              </div>
              <!-- Add more details as needed -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment"; // Import moment.js for date formatting

export default {
  data() {
    return {
      blogs: [],
      selectedBlog: null,
    };
  },
  created() {
    // Call the blogs method when the component is created
    this.fetchBlogs();
  },
  methods: {
    async fetchBlogs() {
      try {
        const res = await this.axios.get(this.$api + `/site/all`, {
          headers: {
            Authorization: this.user.token,
          },
        });
        console.log(res);
        let data = res.data;

        // Transform data to target format
        const transformedData = data.map((item) => ({
          title: item.title,
          category: item.category,
          date: this.calculateDateDifference(item.timestamp),
          shortDescription: item.description,
          content: item.description,
          author: {
            name: "Admin",
            avatar:
              "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
          },
        }));

        console.log(transformedData);

        // Update the blogs array with the transformed data
        this.blogs = transformedData;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    calculateDateDifference(timestamp) {
      // Use moment.js to calculate the date difference
      const currentDate = moment();
      const blogDate = moment(timestamp);
      const differenceInDays = currentDate.diff(blogDate, "days");

      // Format the date difference as "Today" if zero days
      return differenceInDays === 0 ? "Today" : `${differenceInDays} days ago`;
    },

    openBlogModal(blog) {
      this.selectedBlog = blog;
    },
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
};
</script>
