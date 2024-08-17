import { createRouter, createWebHistory } from "vue-router";
import Donation from "./view/Donation.vue";
import Login from "./view/Login.vue";
import Register from "./view/Register.vue";
import Feedback from "./view/Feedback.vue";
import ViewInfo from "./view/ViewInfo.vue";
import Appointment from "./view/Appointment.vue";
import ManageAppointment from "./view/ManageAppointment.vue";
import ManageRewardHistory from "./view/ManageRewardHistory.vue";
import DonationHistory from "./view/DonationHistory.vue";
import Reward from "./view/Reward.vue";
import Home from "./view/Home.vue";
import ManageFeedback from "./view/ManageFeedback.vue";
import ManageReward from "./view/ManageReward.vue";
import ManageDonation from "./view/ManageDonation.vue";
import navbaradmin from "./components/NavBarAdmin.vue";
import ManageInfo from "./view/ManageInfo.vue";
import GenerateReport from "./view/analystics.vue";
import Profile from "./view/Profile.vue"

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/donation",
    component: Donation,
    name: "donation",
  },
  {
    path: "/home",
    component: Home,
    name: "home",
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/feedback",
    component: Feedback,
  },
  {
    path: "/viewinfo",
    component: ViewInfo,
  },
  {
    path: "/appointment",
    component: Appointment,
  },
  {
    path: "/manageappointment",
    component: ManageAppointment,
  },
  {
    path: "/managerewardhistory",
    component: ManageRewardHistory,
  },
  {
    path: "/donationhistory",
    component: DonationHistory,
  },

  {
    path: "/reward",
    component: Reward,
  },
  {
    path: "/managefeedback",
    component: ManageFeedback,
  },
  {
    path: "/managedonation",
    component: ManageDonation,
  },
  {
    path: "/managereward",
    component: ManageReward,
  },

  {
    path: "/manageinfo",
    component: ManageInfo,
  },
  {
    path: "/generatereport",
    component: GenerateReport,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
