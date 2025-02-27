// This file is auto-generated by @hey-api/openapi-ts

export type AuthLoginResponse = {
    token: string;
};

export type AuthLoginError = unknown;

export type ActuatorsGetActuatorsResponse = {
    actuators: Array<{
        actuatorId: string;
        status: 'idle' | 'moving';
    }>;
};

export type ActuatorsGetActuatorsError = unknown;

export type ActuatorsGetActuatorByIdData = {
    path: {
        id: string;
    };
};

export type ActuatorsGetActuatorByIdResponse = {
    actuator: {
        actuatorId: string;
        status: 'idle' | 'moving';
    };
};

export type ActuatorsGetActuatorByIdError = unknown;

export type ActuatorsMoveData = {
    path: {
        id: string;
    };
};

export type ActuatorsMoveResponse = {
    actuator: {
        actuatorId: string;
        status: 'idle' | 'moving';
    };
};

export type ActuatorsMoveError = unknown;

export type ActuatorsStopData = {
    path: {
        id: string;
    };
};

export type ActuatorsStopResponse = {
    actuator: {
        actuatorId: string;
        status: 'idle' | 'moving';
    };
};

export type ActuatorsStopError = unknown;

export type $OpenApiTs = {
    '/auth/login': {
        post: {
            res: {
                /**
                 * Successful response
                 */
                '200': {
                    token: string;
                };
                /**
                 * Error response
                 */
                default: {
                    message: string;
                    code: string;
                    issues?: Array<{
                        message: string;
                    }>;
                };
            };
        };
    };
    '/actuators': {
        get: {
            res: {
                /**
                 * Successful response
                 */
                '200': {
                    actuators: Array<{
                        actuatorId: string;
                        status: 'idle' | 'moving';
                    }>;
                };
                /**
                 * Error response
                 */
                default: {
                    message: string;
                    code: string;
                    issues?: Array<{
                        message: string;
                    }>;
                };
            };
        };
    };
    '/actuators/{id}': {
        get: {
            req: ActuatorsGetActuatorByIdData;
            res: {
                /**
                 * Successful response
                 */
                '200': {
                    actuator: {
                        actuatorId: string;
                        status: 'idle' | 'moving';
                    };
                };
                /**
                 * Error response
                 */
                default: {
                    message: string;
                    code: string;
                    issues?: Array<{
                        message: string;
                    }>;
                };
            };
        };
    };
    '/actuators/{id}/move': {
        post: {
            req: ActuatorsMoveData;
            res: {
                /**
                 * Successful response
                 */
                '200': {
                    actuator: {
                        actuatorId: string;
                        status: 'idle' | 'moving';
                    };
                };
                /**
                 * Error response
                 */
                default: {
                    message: string;
                    code: string;
                    issues?: Array<{
                        message: string;
                    }>;
                };
            };
        };
    };
    '/actuators/{id}/stop': {
        post: {
            req: ActuatorsStopData;
            res: {
                /**
                 * Successful response
                 */
                '200': {
                    actuator: {
                        actuatorId: string;
                        status: 'idle' | 'moving';
                    };
                };
                /**
                 * Error response
                 */
                default: {
                    message: string;
                    code: string;
                    issues?: Array<{
                        message: string;
                    }>;
                };
            };
        };
    };
};