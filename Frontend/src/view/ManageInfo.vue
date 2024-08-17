<template>
  <div
    class="h-screen p-4 bg-gradient-to-r from-[#A2999E] via-[#846A6A] to-[#353B3C]"
  >
    <div class="p-4">
      <div class="dashboard-area bg-[#C6C7C4] p-5 rounded-lg shadow-md mb-6">
        <h2 class="text-2xl font-bold text-gray-700 mb-3">
          Manage Information
        </h2>

        <!-- Search Bar and Add New Post Button -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <input
              v-model="searchTerm"
              type="text"
              class="p-2 border rounded-md w-96"
              placeholder="Search..."
            />
            <button
              @click="openAddNewPostModal"
              class="bg-[#353B3C] hover:bg-[#846A6A] text-white py-2 px-4 rounded flex items-center"
            >
              Add New Post
            </button>
          </div>
        </div>
      </div>

      <!-- Posts Table -->
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <!-- Table Header -->
                <thead class="bg-[#C6C7C4]">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Post ID
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Post Category
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Post Title
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Last Modified
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Author
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-[#353B3C] uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <!-- Table Body -->
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(post, index) in posts" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ post.pid }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ post.category }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ post.title }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ post.timestamp || "N/A" }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ post.uid }}
                      </div>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                    >
                      <button
                        @click="viewPost(post)"
                        class="text-[#846A6A] hover:text-indigo-900 mr-2"
                      >
                        View
                      </button>
                      <button
                        @click="editPost(post)"
                        class="text-[#846A6A] hover:text-indigo-900 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteSite(post.pid)"
                        class="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal for Viewing Article Content -->
      <div
        v-if="viewArticleModal.isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-gray-800 opacity-75"
          @click="cancelViewArticle"
        ></div>
        <div class="bg-white p-6 rounded-lg shadow-xl z-10 max-w-lg">
          <h2 class="text-2xl font-bold mb-4">View Article</h2>

          <div class="mb-4 grid grid-cols-2 text-sm gap-2">
            <div class="grid grid-cols-4">
              <p class="font-semibold">Title:</p>
              <h3 class="ml-4 col-span-3">
                {{ selectedArticle.title }}
              </h3>
            </div>
            <div class="grid grid-cols-4">
              <p class="font-semibold">Category:</p>
              <h3 class="ml-4 col-span-3">
                {{ selectedArticle.category }}
              </h3>
            </div>
            <div class="grid grid-cols-4">
              <p class="font-semibold">Author:</p>
              <p class="ml-4 col-span-3">
                {{ selectedArticle.uid }}
              </p>
            </div>
            <div class="grid grid-cols-4">
              <p class="font-semibold">Date Posted:</p>
              <p class="ml-4 col-span-3">
                {{ selectedArticle.timestamp }}
              </p>
            </div>
          </div>
          <p class="font-semibold">Content</p>
          <p
            class="text-gray-700 w-full max-h-[500px] min-h-[100px] overflow-y-auto"
          >
            {{ selectedArticle.description }}
          </p>
          <div class="flex justify-end">
            <button
              @click="cancelViewArticle"
              class="bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <!-- Modal for Add New Post -->
      <div
        v-if="addNewPostModal.isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-gray-800 opacity-75"
          @click="cancelAddNewPost"
        ></div>
        <div class="bg-white p-6 rounded-lg shadow-xl z-50 max-w-xl">
          <h2 class="text-2xl font-bold mb-4">Add New Post</h2>
          <div class="mb-4">
            <label
              for="postTitle"
              class="block text-sm font-medium text-gray-700"
            >
              Post Type
            </label>
            <input
              v-model="newPost.type"
              type="text"
              id="postTitle"
              name="postTitle"
              class="p-2 border rounded-md w-full"
              placeholder="Enter post type"
            />
          </div>
          <div class="mb-4">
            <label
              for="postContent"
              class="block text-sm font-medium text-gray-700"
            >
              Post Title
            </label>
            <input
              v-model="newPost.title"
              type="text"
              id="authorName"
              name="authorName"
              class="p-2 border rounded-md w-full"
              placeholder="Enter post title"
            />
          </div>
          <div class="mb-4">
            <label
              for="postContent"
              class="block text-sm font-medium text-gray-700"
            >
              Post Category
            </label>
            <input
              v-model="newPost.category"
              type="text"
              id="authorName"
              name="authorName"
              class="p-2 border rounded-md w-full"
              placeholder="Enter post category"
            />
          </div>
          <div class="mb-4">
            <label
              for="authorName"
              class="block text-sm font-medium text-gray-700"
            >
              Post Description
            </label>
            <textarea
              v-model="newPost.description"
              id="postContent"
              name="postContent"
              rows="3"
              class="p-2 border rounded-md w-full"
              placeholder="Enter post description"
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button
              @click="cancelAddNewPost"
              class="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              @click="submitNewSite"
              class="bg-green-600 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- modal edit post-->
  <div
    v-if="editPostModal.isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div
      class="absolute inset-0 bg-gray-800 opacity-75"
      @click="cancelEditPost"
    ></div>
    <div class="bg-white p-6 rounded-lg shadow-xl z-10" style="width: 35%">
      <h2 class="text-2xl font-bold mb-4">Edit Post</h2>
      <div class="mb-4">
        <!-- Form Fields for Editing -->
        <label class="block text-sm font-medium text-gray-700">Post ID</label>
        <input
          v-model="editPostModal.post.pid"
          class="p-2 border rounded-md w-full"
          readonly
        />
        <label class="block text-sm font-medium text-gray-700 mt-4"
          >Post Type</label
        >
        <input
          v-model="editPostModal.post.type"
          class="p-2 border rounded-md w-full"
        />

        <label class="block text-sm font-medium text-gray-700 mt-4"
          >Post Title</label
        >
        <input
          v-model="editPostModal.post.title"
          class="p-2 border rounded-md w-full"
        />
        <label class="block text-sm font-medium text-gray-700 mt-4"
          >Post Category</label
        >
        <input
          v-model="editPostModal.post.category"
          class="p-2 border rounded-md w-full"
        />
        <label class="block text-sm font-medium text-gray-700 mt-4"
          >Post Content</label
        >
        <input
          v-model="editPostModal.post.description"
          class="p-2 border rounded-md w-full"
        />
      </div>
      <div class="flex justify-end">
        <button
          @click="cancelEditPost"
          class="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          @click="submitEditPost"
          class="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ManageInfo",

  data() {
    return {
      posts: [],
      editPostModal: {
        isOpen: false,
        post: {
          pid: null, // Assuming pid is needed for identification
          type: "",
          title: "",
          category: "",
          description: "",
        },
      },
      searchTerm: "",
      addNewPostModal: {
        isOpen: false,
      },
      deleteConfirmation: {
        isOpen: false,
        post: null,
      },
      newPost: {
        type: "",
        title: "",
        category: "",
        description: "",
      },
      viewArticleModal: {
        isOpen: false,
      },
      selectedArticle: null,
    };
  },

  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
    filteredPosts() {
      const filtered = this.posts.filter((post) => {
        const searchMatch = post.postTitle
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
        return searchMatch;
      });
      return filtered;
    },
  },

  methods: {
    // Delete the data of the info site
    async deleteSite(pid) {
      try {
        const res = await axios.delete(`${this.$api}/site/${pid}/delete`, {
          headers: {
            Authorization: this.user.token,
          },
        });
        alert(res.data.message);
        this.addNewPostModal.isOpen = false;
        this.refreshPage();
      } catch (error) {
        console.error("Error deleting site:", error);
        // Handle error as needed, e.g., show an error message
      }
    },

    // Edit the data of the info site
    async submitEditPost() {
      try {
        const postId = this.editPostModal.post.pid;
        const { type, title, category, description } = this.editPostModal.post;

        // Make a PUT request to update the post on the backend
        const res = await axios.put(
          `${this.$api}/site/${postId}/update`,
          {},
          {
            type,
            title,
            category,
            description,
          },
          {
            headers: {
              Authorization: this.user.token,
            },
          }
        );

        alert(res.data.message);

        // Close the edit modal
        this.cancelEditPost();
        this.refreshPage();
      } catch (error) {
        console.error("Error updating post:", error);
      }
    },
    refreshPage() {
      location.reload();
    },

    // Add the data of the info site
    async submitNewSite() {
      try {
        const { type, title, category, description } = this.newPost;

        const currentDate = new Date();
        const timestamp = currentDate.toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "UTC", // Adjust timeZone based on your requirements
        });

        // Send a POST request to the backend API to add a new site
        await axios.post(`${this.$api}/site/${this.user.uid}/add`, {
          type,
          title,
          category,
          description,
          timestamp,
        });

        await this.getAllSites();

        this.cancelAddNewPost();
      } catch (error) {
        console.error("Error adding new site:", error);
      }
    },

    // Get the data of the info site
    async getAllSites() {
      try {
        const res = await axios.get(`${this.$api}/site/all`, {
          headers: {
            Authorization: this.user.token,
          },
        });
        console.log(res);
        this.posts = res.data;
        return this.posts;
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    },

    openAddNewPostModal() {
      this.addNewPostModal.isOpen = true;
    },

    cancelAddNewPost() {
      this.addNewPostModal.isOpen = false;
      this.clearNewPostForm();
    },

    clearNewPostForm() {
      this.newPost = {
        type: "",
        title: "",
        category: "",
        description: "",
      };
    },

    submitNewPost() {
      const newPost = {
        postId: this.generatePostId(),
        postTitle: this.newPost.postTitle,
        postContent: this.newPost.postContent,
        author: this.newPost.authorName,
        datePosted: new Date().toLocaleString(),
      };
      this.posts.push(newPost);
      this.cancelAddNewPost();
    },

    generatePostId() {
      // Logic to generate a unique post ID
      // You can use a library like uuid or implement your own logic
      return Math.floor(Math.random() * 1000) + 1;
    },

    confirmDeletePost(post) {
      this.deleteConfirmation.isOpen = true;
      this.deleteConfirmation.post = post;
    },

    cancelDeletePost() {
      this.deleteConfirmation.isOpen = false;
      this.deleteConfirmation.post = null;
    },

    // Additional methods for viewPost and editPost can be implemented based on your requirements
    viewPost(post) {
      // Logic for viewing a post
      console.log("Viewing post:", post);
    },

    // Method to open the modal for viewing article description
    viewPost(post) {
      this.selectedArticle = post;
      this.viewArticleModal.isOpen = true;
    },

    // Method to cancel viewing article description
    cancelViewArticle() {
      this.selectedArticle = null;
      this.viewArticleModal.isOpen = false;
    },
    editPost(post) {
      this.editPostModal.post = { ...post };
      this.editPostModal.isOpen = true;
    },

    cancelEditPost() {
      this.editPostModal.isOpen = false;
      this.editPostModal.post = null;
    },
  },
  mounted() {
    this.getAllSites();
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
