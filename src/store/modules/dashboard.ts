/* eslint-disable no-async-promise-executor */

import { getMeetingList, meetingPlans, quickMeeing } from "@/api/conf-api/api";
import { State } from "ionicons/dist/types/stencil-public-runtime";

interface State {
  [key: string]: any;
  meetingList: any[];
  historyList: any[];
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  totalPageCount: number;
  infoMeeting: any;
  server: any[];
  participantsList: any[];
  participantsListCount: any;
  inviteesList: any[];
  meetingPlans: any[];
  roomIndexPlan: string;
}

const initialState: State = {
  meetingList: [],
  historyList: [],
  pageSize: 0,
  pageIndex: 0,
  totalCount: 0,
  totalPageCount: 0,
  infoMeeting: {},
  server: [],
  participantsList: [],
  participantsListCount: {},
  inviteesList: [],
  meetingPlans: [],
  roomIndexPlan: ''
};

export default {
  namespaced: true,
  state: initialState,
  mutations: {
    SET(state: State, [key, value]: [string, any]) {
      state[key] = value;
    },
    RESET(state: State) {
      Object.assign(state, initialState);
    },
  },
  getters: {
    get: (state: State) => (key: string) => state[key]
  },
  actions: {
    fetchList(
      { commit }: { commit: any },
      payload: { pageSize: string; meetingState: string }
    ) {
      return new Promise(async (resolve, reject) => {
        const { meetingState } = payload;
        const res = await getMeetingList(payload);

        if (res.retCode === "0") {
          const { data, pageIndex, pageSize, totalCount, totalPageCount } =
            res.data;

          if (meetingState === "0") {
            commit("SET", ["meetingList", data]);
          } else if (meetingState === "1") {
            commit("SET", ["historyList", data]);
          }

          commit("SET", ["pageIndex", pageIndex]);
          commit("SET", ["pageSize", pageSize]);
          commit("SET", ["totalCount", totalCount]);
          commit("SET", ["totalPageCount", totalPageCount]);

          resolve(res);
        } else {
          reject(res);
        }
      });
    },
    quickStart({ commit }: { commit: any },payload: any) {
      return new Promise(async (resolve, reject) => {
        const res = await quickMeeing(payload)

        if (res.retCode == '0'){
          resolve(res)
          console.debug("quickstart",res)
        }else{
          reject(res)
        }
      });
    },
    meetingPlans({ commit }: { commit: any }, payload: any) {
      return new Promise(async (resolve, reject) => {
        const res = await meetingPlans(payload)

        if (res.retCode == '0') {
          commit("SET", ["meetingPlans", res.data]);
          resolve(res.data)
        }else{
          reject(res.data)
        }
      });
    },
    setPlans({ commit }: { commit: any }, roomIndex: string) {
      return new Promise(async (resolve, reject) => {
        console.debug('roomIndex',roomIndex)
        commit("SET", ["roomIndexPlan", roomIndex]);
      });
    },
    // detailParticipants({ commit }: { commit: any }, payload: any) {
    //   return new Promise(async (resolve, reject) => {
    //     const res = await API.meeting_detail_participant(payload);
    //     const response = res.data;

    //     if (response.retCode === "0") {
    //       if (payload.type === 2) {
    //         const { data, otherObj } = response.data;
    //         commit("SET", ["participantsList", data]);
    //         commit("SET", ["participantsListCount", otherObj]);
    //       } else if (payload.type === 0) {
    //         commit("SET", ["inviteesList", response.data.data]);
    //       }

    //       resolve(response);
    //     } else {
    //       reject(response);
    //     }
    //   });
    // },
    // openMeeting({ commit }: { commit: any }, payload: any) {
    //   return new Promise(async (resolve, reject) => {
    //     const res = await API.open_meeting(payload);
    //     const response = res.data;

    //     if (response.retCode === "0") {
    //       resolve(response);
    //     } else {
    //       reject(response);
    //     }
    //   });
    // },
    // getPlans({ commit }: { commit: any }, payload: any) {
    //   return new Promise(async (resolve, reject) => {
    //     const res = await API.get_plans(payload);
    //     const response = res.data;

    //     if (response.retCode === "0") {
    //       const { packages } = response.data;
    //       commit("SET", ["meetingPlans", packages]);
    //       resolve(response);
    //     } else {
    //       reject(response);
    //     }
    //   });
    // },
  },
};
