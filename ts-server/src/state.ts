export type State = {
  operationalStatus: "normal" | "estop"
  actuators: Record<string, ActuatorStatus>
};

export type ActuatorStatus = {
  actuatorId: string
  status: "idle" | "moving"
};

export const state: State = {
  operationalStatus: "normal",
  actuators: {
    "1": {
      actuatorId: "1",
      status: "idle",
    },
    "2": {
      actuatorId: "2",
      status: "idle",
    },
    "3": {
      actuatorId: "3",
      status: "moving",
    },
    "4": {
      actuatorId: "4",
      status: "idle",
    },
  },
};
